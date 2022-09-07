import {useState} from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

function OlvidePassword() {
    
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});
    async function handleSubmit(e){
        e.preventDefault();
        if(email === '' || email.length < 7){
            setAlerta({
                msg: 'El Email es obligatorio',
                error: true
            });
            return;
        }
        try {
            const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {email});
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg, 
                error: true
            });
        }
        

    }

  return (
    <>
        <h1 className='text-sky-600 font-black text-4xl capitalize'>Recupera tu acceso y no pierdas tus {' '}
        <span className='text-slate-700'>proyectos</span></h1>
        {alerta?.msg && <Alerta alerta={alerta}/>}
        <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>

            <div className='my-4'>
                <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>Email:</label>
                <input type='email' id='email' name='email' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Correo por registrar' value={email} onChange={ (e)=> setEmail(e.target.value)}/>
            </div>
            <input type='submit' value='Enviar Instrucciones' className='bg-sky-700 w-full py-3 text-white font-bold uppercase rounded mb-5 hover:bg-sky-900 hover:cursor-pointer transition-all'/>
        </form>
        <nav className='lg:flex lg:justify-between'>
            <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
                ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link to='/registrar' className='block text-center my-5 text-slate-500 uppercase text-sm'>
                ¿No tienes una cuenta? Regístrate
            </Link>
        </nav>
    </>
  )
}

export default OlvidePassword