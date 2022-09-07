import React from 'react'

import useProyectos from '../hooks/useProyectos';

function Colaborador({colaborador}) {
    const {nombre, email} = colaborador;

    const {handleModalEliminarColaborador} = useProyectos();

  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div>
            <p>{nombre}</p>
            <p className='text-sm text-gray-700'>{email}</p>
        </div>

        <div>
            <button className='py-3 px-4  bg-red-600 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-800 transition-all' type='button'
                onClick={ ()=> handleModalEliminarColaborador(colaborador)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Colaborador