import React from 'react'
import { useParams } from 'react-router-dom'

export const SemestrePage=()=> {

    const {semestreid}=useParams();

  return (
    <div>el semestre es: {semestreid}</div>
  )
}
