import React from 'react'
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import Busqueda from './Busqueda';
import {Link} from 'react-router-dom';
function Header() {
  const {buscador, handleBuscador, cerrarSesionProyectos} = useProyectos();
  const {cerrarSesionAuth} = useAuth();

  function handleCerrarSesion(){
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem('token');
  }
  return (
    <header className='px-4 py-5 bg-white border-b '>
        <div className='flex flex-col md:flex-row md:justify-between items-center'>
            <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'><Link to='/proyectos'>UpTask</Link></h2>
            <button type='button' className=' font-bold uppercase items-center' onClick={handleBuscador}>Buscar Proyecto</button>
            <div className='flex flex-col md:flex-row items-center gap-4'>
                <Link to='/proyectos' className='font-bold uppercase'>Proyectos</Link>
                <button type='button' className='text-white text-sm bg-sky-600 hover:cursor-pointer hover:bg-sky-900 rounded-md p-3 uppercase font-bold transition-all'
                  onClick={handleCerrarSesion}
                >Cerrar Sesión</button>
                <Busqueda/>
            </div>
        </div>
    </header>
  )
}

export default Header