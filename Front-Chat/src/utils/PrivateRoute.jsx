/* import React from 'react'
import { redirect, Route } from 'react-router-dom';
import { useAuthState } from '../Context'

export const PrivateRoute = ({component: Component, ...rest }) => {
    const { isAuthenticated } = useAuthState();
  return (
    <Route 
    {...rest}
    render= {props => 
    isAuthenticated ? (<Component {...props}/> ): (<redirect to="/login"/>)}
    />
  )
} */

import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../Context";

const PrivateRoute = ()=> {
    let { isAuthenticated } = useAuthState();
    if(!isAuthenticated){
        return <Navigate to={"/login"}/>
    }
    return (
        <Outlet />
    )

}

export default PrivateRoute


