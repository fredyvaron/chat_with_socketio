import React from 'react'
import user from '../../assets/icon-1633249.svg'

export default function User({User}) {
  return (
    <div className='flex flex-col sm:flex-row items-center py-4 px-4 hover:bg-gray-600 cursor-pointer '>
      <img className=' h-16 w-16 rounded-full ' src={User.image} alt="SVG as an image"/>
      <div className='text-center md:p-4'>
{User.nombre}
      </div>
    </div>
  )
}
