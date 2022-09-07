import {useState, useEffect} from 'react';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';

function FormularioProyecto() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cliente, setCliente] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [idEditando, setIdEditando] = useState(null);

    const {id} = useParams();
    
    const {alerta, mostrarAlerta, submitProyecto, proyecto} = useProyectos();

    useEffect(()=>{
        if(id){
            setIdEditando(proyecto._id);
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setCliente(proyecto.cliente);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
        }
    },[id])

    async function handleSubmit(e){
        e.preventDefault();
        if([nombre, descripcion, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }
        // Pasar los datos al provider
        await submitProyecto({idEditando, nombre, descripcion, cliente, fechaEntrega});
        
        setIdEditando(null);
        setNombre('');
        setDescripcion('');
        setCliente('');
        setFechaEntrega('');
    }

  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow' onSubmit={ handleSubmit }>
        {alerta?.msg && <Alerta alerta={alerta}/>}
        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombre'>Nombre del Proyecto:</label>
            <input type='text' id='nombre' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Nombre Proyecto' value={ nombre } onChange={(e) => setNombre(e.target.value)}/>
        </div>
        
        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='descripcion'>Descripcion del Proyecto:</label>
            <textarea id='descripcion' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Descripcion del Proyecto' value={ descripcion } onChange={ (e) => setDescripcion(e.target.value) }/>
        </div>

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='fecha'>Fecha de Entrega del Proyecto:</label>
            <input type='date' id='fecha' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={fechaEntrega} onChange={ (e) => setFechaEntrega(e.target.value) }/>
        </div>

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='cliente'>Cliente del Proyecto:</label>
            <input type='text' id='cliente' className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Cliente Proyecto' value={cliente} onChange={ (e) => setCliente(e.target.value) }/>
        </div>

        <input type='submit' value={idEditando ? 'Guardar Cambios' : 'Crear Proyecto'} className='p-3 w-full bg-sky-600 cursor-pointer hover:bg-sky-900 transition-all text-white uppercase font-bold rounded'/>
        
    </form>
  )
}

export default FormularioProyecto