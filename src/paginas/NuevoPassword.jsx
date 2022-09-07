import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

function NuevoPassword() {
    const [password, setPassword] = useState('');
    const [passwordReseteado, setPasswordReseteado] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const {token} = useParams();
    useEffect(()=>{
        async function comprobarToken(){
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        return ()=>{comprobarToken()}
    },[])
    
    async function handleSubmit(e){
        e.preventDefault();
        if(password.length<6){
            setAlerta({
                msg: 'El password debe contener, al menos, 6 caracteres',
                error: true
            });
            return;
        }

        try {
            const {data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password});
            setAlerta({
                msg: data.msg, 
                error: false
            });
            setPasswordReseteado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
  return (
    <>
        <h1 className='text-sky-600 font-black text-4xl capitalize'>Reestablece tu pasword y no pierdas acceso a tus {' '}
        <span className='text-slate-700'>proyectos</span></h1>
        {alerta?.msg &&  <Alerta alerta={alerta}/>}
        {tokenValido && (
            <>
                <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
                    <div className='my-4'>
                        <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>Nuevo Password:</label>
                        <input type='password' id='password' name='password' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Escribe tu nuevo password' value={password} onChange={ (e)=>{setPassword(e.target.value)} }/>
                    </div>
                    <input type='submit' value='Guardar Nuevo Password' className='bg-sky-700 w-full py-3 text-white font-bold uppercase rounded mb-5 hover:bg-sky-900 hover:cursor-pointer transition-all'/>
                </form>
            {passwordReseteado && (
                <Link to='/' className='block text-center my-5 font-bold p-3 uppercase bg-sky-600 text-white text-xl'>
                Inicia Sesión
                </Link>
            )}
            </>
        )}
    </>
  )
}

export default NuevoPassword