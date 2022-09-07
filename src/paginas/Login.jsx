import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

import useAuth from '../hooks/useAuth';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    const {setAuth, cargando} = useAuth();


    async function handleSubmit(e){
        e.preventDefault();
        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        try {
            const {data} = await clienteAxios.post(`/usuarios/login`, {email, password})
            localStorage.setItem('token', data.token);
            setAlerta({msg: 'Iniciando Sesión', error: false});
            navigate('/proyectos');
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
        
        
    }
  return (
    <>
        <h1 className='text-sky-600 font-black text-4xl capitalize'>Inicia sesión y administra tus {' '}
        <span className='text-slate-700'>proyectos</span></h1>
        {alerta?.msg && <Alerta alerta={alerta}/>}
        <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
            <div className='my-4'>
                <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>Email:</label>
                <input type='email' id='email' name='email' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Email de registro' value={email} onChange={ (e) => setEmail(e.target.value)}/>
            </div>
            <div className='my-4'>
                <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>Contraseña:</label>
                <input type='password' id='password' name='password' className='w-full p-2 mt-3 border rounded-xl bg-gray-50' placeholder='Tu Contraseña' value={password} onChange={ (e) => setPassword(e.target.value)}/>
            </div>
            <input type='submit' value='Iniciar Sesión' className='bg-sky-700 w-full py-3 text-white font-bold uppercase rounded mb-5 hover:bg-sky-900 hover:cursor-pointer transition-all' />
        </form>
        <nav className='lg:flex lg:justify-between'>
            <Link to='registrar' className='block text-center my-5 text-slate-500 uppercase text-sm'>
                ¿No tienes una cuenta? Regístrate
            </Link>
            <Link to='olvide-password' className='block text-center my-5 text-slate-500 uppercase text-sm'>
                Olvidé Mi Password
            </Link>
        </nav>

    </>
  )
}

export default Login