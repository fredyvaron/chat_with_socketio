import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Uselogin() {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true);
    const users = useSelector((state)=> state.users)
    useEffect(()=> {
      const user = JSON.parse(window.localStorage.getItem('user'))
      setData(user)
    }, [data])

  return { users, data}
}
