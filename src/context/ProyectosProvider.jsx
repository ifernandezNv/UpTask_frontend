
import {createContext, useState, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';
import io from 'socket.io-client';
let socket;

const ProyectosContext = createContext();

function ProyectosProvider({children}) {

    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTarea, setModalFromularioTarea] = useState(false);
    const [colaborador, setColaborador] = useState({});

    const [tarea, setTarea] = useState({});

    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
    const [buscador, setBuscador] = useState(false);


    useEffect(()=>{
      socket = io(import.meta.env.VITE_BACKEND_URL);
    },[])

    const navigate = useNavigate();

    const {auth} = useAuth();

    function mostrarAlerta(alerta){
      setAlerta(alerta);
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }

    async function submitProyecto(proyecto){
      if(proyecto.idEditando){
        await editarProyecto(proyecto);
      }else{
        await nuevoProyecto(proyecto);
      }
    }

    async function nuevoProyecto(proyecto){
      try {
        const token = localStorage.getItem('token');
        if(!token){
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const {data} = await clienteAxios.post(`/proyectos`, proyecto, config);
        setAlerta({
          msg: 'Proyecto Creado Correctamente',
          error: false
        });
        setProyectos([...proyectos, data]);
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      } catch (error) {
        console.log(error);      
      }
    }

    async function editarProyecto(proyecto){
      console.log('editando...');
      try {
        const token = localStorage.getItem('token');
        if(!token){
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const {data} = await clienteAxios.put(`/proyectos/${proyecto.idEditando}`, proyecto, config);
        
        // Sincronizar el state
        const proyectosActualizados = proyectos.map(project => project._id === data._id ? data : project);
        setProyectos(proyectosActualizados);

        setAlerta({
          msg: 'Proyecto Editado Correctamente',
          error: false
        });

        setTimeout(() => {
          setAlerta({});
          navigate('/proyectos');
        }, 3000);
      } catch (error) {
        console.log(error); 
      }
    }

    async function eliminarProyecto(id){
      try {
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
          headers: {
            "Context-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const {data} = await clienteAxios.delete(`/proyectos/${id}`, config);
        setAlerta({
          msg: data.msg,
          error: false
        })
        const proyectosActualizados = proyectos.filter(project => project._id !== id);
        setProyectos(proyectosActualizados);

        setTimeout(() => {
          setAlerta({});
          navigate('/proyectos');  
        }, 3000);
        
      } catch (error) {
        console.log(error);
      }
    }

    async function obtenerProyecto(id){
      try {
        setCargando(true);
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const {data} = await clienteAxios(`/proyectos/${id}`, config)
        setProyecto(data);

        setTimeout(() => {
          setAlerta({});
        }, 3000);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
        setTimeout(() => {
          setAlerta({});
          navigate('/proyectos');
        }, 3000);
      }
      setCargando(false);
    }

    useEffect(()=>{
      
      async function obtenerProyectos(){
        try {
          const token = localStorage.getItem('token');
          if(!token)return;
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
          const {data} = await clienteAxios('/proyectos', config);
          setProyectos(data);

        } catch (error) {
          console.log(error);
        }
      }
      obtenerProyectos()
    },[auth])

    function handleModalTarea(){
      setModalFromularioTarea(!modalFormularioTarea);
      setTarea({});
    }

    async function crearTarea(tarea){
      if(!tarea.idTarea){
        await agregarTarea(tarea);
      }else{
        await editarTarea(tarea);
      }
    }

    async function agregarTarea(tarea){
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
      try {
        const {data} = await clienteAxios.post('/tareas', tarea, config);
        setAlerta({
          msg: 'Tarea Creada Correctamente',
          error: false
        });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
        setModalFromularioTarea(false);
        // Socket IO
        socket.emit('nueva tarea', data);
      } catch (error) {
        console.log(error); 
      }
    }
    async function editarTarea(tarea){
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
      try {
        const {data} = await clienteAxios.put(`/tareas/${tarea.idTarea}`, tarea, config);
        setAlerta({
          msg: 'Tarea Editada Correctamente',
          error: false
        });

        //Actualizar el DOM
        setModalFromularioTarea(false);
        socket.emit('actualizar tarea', data);
      } catch (error) {
        console.log(error); 
      }
    }

    function handleModalEditarTarea(tarea){
      setTarea(tarea);
      setModalFromularioTarea(true);
    }

    function handleModalEliminarTarea(tarea){
      setTarea(tarea);
      setModalEliminarTarea(!modalEliminarTarea);
    }

    async function eliminarTarea(tarea){
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
      try {
        const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config);
        setAlerta({
          msg: 'Tarea Eliminada Correctamente',
          error: false
        });

        //Actualizar el DOM
        setModalEliminarTarea(false);
        setTimeout(() => {
          setAlerta({});
        }, 3000);
        // SOCKETIO
        socket.emit('eliminar tarea', tarea);
        setTarea({});
      } catch (error) {
        console.log(error); 
      }
    }

    async function submitColaborador(email){
      setCargando(true);
      try {
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
        const {data} = await clienteAxios.post('/proyectos/colaboradores', {email}, config );
        setColaborador(data);
        setAlerta({});
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg, 
          error: true
        });
      }
      setCargando(false);
    }

    async function agregarColaborador(email){
      try {
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
        const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
        setAlerta({
          msg: data.msg,
          error: false
        });
        setColaborador({});
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    } 
    async function eliminarColaborador(){
      try {
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
        const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config);

        const proyectoActualizado = {...proyecto};
        proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter( colaboradorState => colaboradorState._id !== colaborador._id);

        setProyecto(proyectoActualizado);

        setAlerta({
          msg: data.msg,
          error: false
        });
        console.log(data);
        setColaborador({});
        setModalEliminarColaborador(!modalEliminarColaborador);
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }

    function handleModalEliminarColaborador(colaboradorState){
      setModalEliminarColaborador(!modalEliminarColaborador);
      setColaborador(colaboradorState);
    }

    async function modificarEstadoTarea(id){
      try {
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
        const {data} = await clienteAxios.post(`/tareas/actualizar-estado/${id}`, {}, config);
        
        socket.emit('cambiar estado', data)
        setTarea({});
        setAlerta({});
      } catch (error) {
        console.log(error);
      }
    } 

    function handleBuscador(){
      setBuscador(!buscador);
    }

    // Funciones de socket.io
    function submitTareasProyecto(tareaState){
      const proyectoActualizado = {...proyecto};
      proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaState];
      setProyecto(proyectoActualizado);
    } 
    function eliminarTareaProyecto(tareaState){
      const proyectoActualizado = {...proyecto};
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaS => tareaS._id !== tareaState._id);
      setProyecto(proyectoActualizado);
    }
    function actualizarTareaProyecto(tareaState){
      const proyectoActualizado = {...proyecto};
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaS => tareaS._id === tareaState._id ? tareaState : tareaS);
      setProyecto(proyectoActualizado);
    }
    function completarTareaProyecto(tareaState){
      const proyectoActualizado = {...proyecto};
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaS => tareaS._id === tareaState._id ? tareaState : tareaS);
      setProyecto(proyectoActualizado);
    }
    
    function cerrarSesionProyectos(){
      setProyectos([]);
      setProyecto({});
      setAlerta({});
    }
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        setProyectos,
        alerta, 
        mostrarAlerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        crearTarea,
        handleModalEditarTarea,
        tarea,
        modalEliminarTarea,
        setModalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        modalEliminarColaborador,
        handleModalEliminarColaborador,
        eliminarColaborador,
        modificarEstadoTarea,
        buscador,
        handleBuscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        completarTareaProyecto,
        cerrarSesionProyectos
      }}
    >
        {children}
    </ProyectosContext.Provider>
  )
}
export {ProyectosProvider}
export default ProyectosContext