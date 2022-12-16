import React from 'react'

export const ComentarioCard=({persona})=> {
  return (
    <div>
        <h1>Comentarios</h1>
        <hr/>
        <div class='flex flex-row  items-center p-10	'>
            <img src={persona.urlImagen} alt='' className='mr-3 w-20 h-20'/>
            <div className='media-body'>
                <h5 className='mt-0 text-lg'>{persona.nombre}</h5>
                <p class='text-sm'>{persona.texto}</p>
            </div>
        </div>
    </div>
  )
}
