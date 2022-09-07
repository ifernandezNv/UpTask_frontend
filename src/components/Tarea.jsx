import { formatearFecha } from "../helpers";

import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

function Tarea({tarea}) {
    const {nombre, descripcion, prioridad, fechaEntrega, _id, estado} = tarea;

    const { handleModalEditarTarea, modalEliminarTarea, handleModalEliminarTarea, modificarEstadoTarea } = useProyectos();

    const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div className='flex flex-col items-start'>
            <p className="mb-2 text-xl">{nombre}</p>
            <p className="mb-2 text-sm text-gray-500 uppercase">{descripcion}</p>
            <p className="mb-2 text-xl">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-2 text-xl text-gray-600">Prioridad: {prioridad}</p>
            {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white" >Completada por: {tarea.completado?.nombre}</p>}
        </div>
        
        
        <div className="flex flex-col lg:flex-row gap-2">
            {admin && (
            <>
                <button type='button' className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sl rounded-lg'
                    onClick={()=> handleModalEditarTarea(tarea)}
                >   Editar</button>
                <button type='button' className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sl rounded-lg'
                    onClick={()=> handleModalEliminarTarea(tarea)}
                >Eliminar</button>
            </>
            )}
            <button type='button' className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sl rounded-lg`}
                onClick={ ()=> modificarEstadoTarea(_id) }
            >{estado ? 'Completa' : 'Incompleta'}</button>
            
        </div>

    </div>
  )
}

export default Tarea