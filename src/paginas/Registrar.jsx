import {useState} from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
function Registrar() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    async function handleSubmit(e){
        e.preventDefault();
        if([nombre, password, email, repetirPassword].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }
        if(password !== repetirPassword){
            setAlerta({
                msg: 'Las contraseñas no son iguales',
                error: true
            });
            return;
        }
        
        if(password.length < 6){
            setAlerta({
                msg: 'La contraseña es muy corta agrega, mínimo, 6 caracteres',
                error: true
            });
            return;
        }
        setAlerta({});
        // Crear el usuario en la API
        try {
            const {data} = await clienteAxios.post(`/usuarios`, {
                nombre,
                email,
                password
            });
            setAlerta({
                msg: data.msg,
                error: false
            });
            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');
        } catch (error) {
            const {data} = error.response;
            setAlerta({
                msg: data.msg,
                error: true
            });
        }
    }

  return (
    <>
        <h1 className='text-sky-600 font-black text-4xl capitalize'>Crea tu cuenta y administra tus {' '}
        <span className='text-slate-700'>proyectos</span></h1>
        { alerta?.msg && <Alerta alerta={alerta}/>}
        
        <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={ handleSubmit }> 
        
            <div className='my-4'>
                <label htmlFor='nombre' className='uppercase text-gray-600 block text-xl font-bold'>Nombre:</label>
                <input type='text' id='nombre' name='nombre' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Tu Nombre' value={nombre} onChange={ (e)=> setNombre(e.target.value)}/>
            </div>
            <div className='my-4'>
                <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>Email:</label>
                <input type='email' id='email' name='email' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Correo por registrar' value={email} onChange={ (e)=> setEmail(e.target.value)}/>
            </div>
            <div className='my-4'>
                <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>Password:</label>
                <input type='password' id='password' name='password' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Password de Registro' value={password} onChange={ (e)=> setPassword(e.target.value)}/>
            </div>
            <div className='my-4'>
                <label htmlFor='passwordRepetido' className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password:</label>
                <input type='password' id='passwordRepetido' name='password' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Repite el password' value={repetirPassword} onChange={ (e)=> setRepetirPassword(e.target.value)}/>
            </div>
            
            <input type='submit' value='Crear Cuenta' className='bg-sky-700 w-full py-3 text-white font-bold uppercase rounded mb-5 hover:bg-sky-900 hover:cursor-pointer transition-all'/>
        </form>
        <nav className='lg:flex lg:justify-between'>
            <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
                ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link to='/olvide-password' className='block text-center my-5 text-slate-500 uppercase text-sm'>
                Olvidé Mi Password
            </Link>
        </nav>

    </>
  )
}

export default Registrar