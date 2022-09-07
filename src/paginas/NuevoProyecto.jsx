import React from 'react'
import useAuth from '../hooks/useAuth';
import FormularioProyecto from '../components/FormularioProyecto';

function NuevoProyecto() {
    const {auth} = useAuth();
  return (
    <>
    <h1 className='text-4xl font-black '>Crear Proyecto</h1>
    <div className='mt-10 flex justify-center'>
      <FormularioProyecto/>
    </div>
  </>
  )
}

export default NuevoProyecto