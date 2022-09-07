import {useContext} from 'react'
import ProyectosContext from '../context/ProyectosProvider'
function useProyectos() {
  return useContext(ProyectosContext);
}

export default useProyectos