"use client";
import React from 'react'

const Button = ({text,handleClick}:{text:string,handleClick?:()=>void}) => {
  return (
    <div    >
      <button onClick={handleClick} className='h-8 text-center flex justify-center items-center w-auto p-2 min-w-28  border-black border-2  rounded-2xl shadow-lg hover:bg-slate-100 transition ease-in'>{text}</button>
    </div>
  )
}

export default Button
