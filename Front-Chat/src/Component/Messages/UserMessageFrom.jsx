import React from 'react'
import UserImage from '../Users/UserImage'
import moment from 'moment';
moment.locale('es')

export default function UserMessageFrom({msg}) {
  return (
    <div className='flex flex-col sm:flex-row items-center px-4 mt-4'>
      <div className='mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
        {msg.message}
        <br />
      <div className='flex flex-row gap-2'>
      {moment(msg.createdAt).format('L')}
      
      </div>
      </div>
      <UserImage/>
    </div>
  )
}
