import React from 'react'
import Search from './Component/Search/Search';
import { useAuthState } from './Context';


export default function Home() {
  const userDetails = useAuthState();
  return (
    <div className='flex flex-col z-0'>
<Search userId={userDetails}/>
<div>
<p>Welcome {userDetails.user.user.nombre}</p>
</div>
  </div>
  )
}
