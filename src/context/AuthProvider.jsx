import {createContext, useState, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import clienteAxios from '../config/clienteAxios';
const AuthContext = createContext();

function AuthProvider({children}) {
  
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    async function autenticarUsuario(){
      const token = localStorage.getItem('token');
      
      if(!token){
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const {data} = await clienteAxios(`/usuarios/perfil`, config);
        setAuth(data);
        if(data._id && location.pathname === '/') {
          navigate('/proyectos')
        }
      } catch (error) {
        setAuth({})
        console.log(error.response.data.msg);  
      }
      setCargando(false);
    }
    
    return ()=>{autenticarUsuario()}
  },[]);

  function cerrarSesionAuth(){
    setAuth({});
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth
      }}
    >
        {children}
    </AuthContext.Provider>
  )
}
export {AuthProvider}
export default AuthContext