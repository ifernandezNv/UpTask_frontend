import {useEffect} from 'react';

import FormularioColaborador from '../components/FormularioColaborador';

import useProyectos from '../hooks/useProyectos'
import {useParams}  from 'react-router-dom';
import Alerta from '../components/Alerta'; 

function NuevoColaborador() {

  const {obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta} = useProyectos();

  const {id} = useParams();

  useEffect(()=>{
    obtenerProyecto(id);
  },[])

  if(!proyecto?._id) return <Alerta alerta={alerta}/>

  return (
    <>
        <h1 className='text-4xl font-black '>Añadir Colaborador(a) al Proyecto {proyecto?.nombre} </h1>
        <div className='flex  justify-center mt-10'>
            <FormularioColaborador/>
        </div>
        {cargando ? <p className='text-center'> Cargando..... </p> : colaborador?._id && (
          <div className=' flex justify-center mt-10'>
            <div className='bg-white px-5 py-10 md:w-2/3 rounded-lg shadow w-full'>
              <h2 className='text-center text-2xl mb-10 font-bold'>Resultado</h2>
              <div className='flex justify-between items-center'>
                <p>{colaborador.nombre}</p>
                <button type='button' className='p-3 bg-slate-500 py-2 rounded-lg uppercase text-white font-bold text-sm hover:bg-slate-800 transition-all' onClick={() => agregarColaborador({email: colaborador.email})}>Agregar al Proyecto</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default NuevoColaborador