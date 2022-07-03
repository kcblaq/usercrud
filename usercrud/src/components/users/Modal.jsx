import React from 'react'

export default function Modal(props) {
  return (
    <div class='absolute w-2/4 h-1/4 border-black left-20 bg-white drop-shadow-md p-6 z-20 top-0 md:left-72 md:w-2/4 md:h-2/5 rounded-lg '>
    <div class='flex justify-between mb-4'>
       <h4> {props.title}</h4>
       <button className='' onClick={props.setNewUser}> X</button>
       </div>
    {props.children}
    </div>
  )
}
