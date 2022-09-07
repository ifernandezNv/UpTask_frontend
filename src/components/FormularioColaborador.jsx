import {useState} from 'react';
import Alerta from './Alerta';
import useProyectos from '../hooks/useProyectos';

function FormularioColaborador() {
    const [email, setEmail] = useState('');

    const {alerta, mostrarAlerta, submitColaborador, cargando} = useProyectos();

    async function handleSubmit(e){
      e.preventDefault();
      if(email === ''){
        mostrarAlerta({
          msg: 'El email es obligatorio',
          error: true
        })
        return;
      }
      submitColaborador(email);
    }
    if(cargando) return 'Cargando....';

  return (
    <>
      <form className='bg-white py-10 px-5 md:w-2/3 rounded-lg shadow w-full'
        onSubmit={handleSubmit}
      >
        {alerta?.msg && <Alerta alerta={alerta}/>}

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='email'>Email del Colaborador: </label>
            <input className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type='email' id='email' placeholder='Email del Usuario' value={email} onChange={ (e) => setEmail(e.target.value) }/>
        </div>
        <input type='submit' value='Buscar Colaborador' className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-all rounded text-sm'/>
      </form>
    </>
  )
}

export default FormularioColaborador