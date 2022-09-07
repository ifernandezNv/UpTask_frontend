import {useEffect} from 'react';
import useProyectos from '../hooks/useProyectos';
import PreviewProyecto from '../components/PreviewProyecto';
import Alerta from '../components/Alerta';

import io from 'socket.io-client';

let socket;

function Proyectos() {
  const {proyectos, alerta} = useProyectos();

  return (
    <>
      <h1 className='text-4xl font-black '>Proyectos</h1>
      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectos.length ? proyectos.map(proyecto => <PreviewProyecto key={proyecto._id} proyecto={proyecto}/> ) : <p className='p-5 text-gray-600 uppercase text-center'>No hay proyectos</p>}
        {alerta?.msg && <Alerta alerta={alerta}/>}
      </div>
    </>
  )
}

export default Proyectos