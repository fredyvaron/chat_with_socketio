import React from 'react'

export default function UserSearch({name, image}) {
  return (
    <div className='flex justify-center items-center hover:bg-gray-100 cursor-pointer' style={{ width: '50vw' }}>
      <img className=' h-12 w-12 rounded bg-orange-100 ' src={image} alt="SVG as an image"/>
      <div className='text-center md:p-4'>
{name}
      </div>
    </div>
  )
}
