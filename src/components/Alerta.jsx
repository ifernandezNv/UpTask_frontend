import React from 'react'

function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? 'bg-red-700' : 'bg-sky-700'} font-bold text-center text-white p-3 uppercase text-sm rounded-xl my-5 `}>
        {alerta.msg}
    </div>
  )
}

export default Alerta