import React from 'react'
import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

function ConfirmarCuenta() {
  const {id} = useParams(); 
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  
  useEffect(()=>{
    async function autenticarCuenta(){
      try {
        const {data} = await clienteAxios(`/usuarios/confirmar/${id}`);
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    return ()=>{autenticarCuenta()}
  },[])

  return (
    <>
        <h1 className='text-sky-600 font-black text-4xl capitalize'>Confirma tu cuenta y comienza a crear tus {' '}
        <span className='text-slate-700'>proyectos</span></h1>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {alerta?.msg && <Alerta alerta={alerta}/>}
          {cuentaConfirmada && (
            <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
              Inicia Sesión
            </Link>
          )}
        </div>

    </>
  )
}

export default ConfirmarCuenta