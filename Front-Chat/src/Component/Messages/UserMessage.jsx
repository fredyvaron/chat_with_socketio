import React from 'react'
import UserImage from '../Users/UserImage'
import moment from 'moment';
moment.locale('es')

export default function UserMessage({msg}) {
  // Use moment now that the locale has been properly set.
  return (
    <div className='flex flex-col sm:flex-row items-center px-4 mt-4'>
      <UserImage iduser={msg.sender_id}/>
      <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
        {msg.message}
      <br />
      <div className='flex flex-row gap-2'>
      {moment(msg.createdAt).format('L')}
      {msg.read? 
      <svg
className='w-8 h-8 fill-blue-700 hover:fill-blue-900'
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M11.602 13.76l1.412 1.412 8.466-8.466 1.414 1.414-9.88 9.88-6.364-6.364 1.414-1.414 2.125 2.125 1.413 1.412zm.002-2.828l4.952-4.953 1.41 1.41-4.952 4.953-1.41-1.41zm-2.827 5.655L7.364 18 1 11.636l1.414-1.414 1.413 1.413-.001.001 4.951 4.951z" />
    </svg>
: <svg
className='w-8 h-8 fill-gray-600 hover:fill-gray-800'
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M11.602 13.76l1.412 1.412 8.466-8.466 1.414 1.414-9.88 9.88-6.364-6.364 1.414-1.414 2.125 2.125 1.413 1.412zm.002-2.828l4.952-4.953 1.41 1.41-4.952 4.953-1.41-1.41zm-2.827 5.655L7.364 18 1 11.636l1.414-1.414 1.413 1.413-.001.001 4.951 4.951z" />
    </svg>}
      </div>


      </div>
    </div>
  )
}


