import React from 'react';
import {useSelector} from "react-redux";
import {Route, Navigate} from "react-router-dom";

export default function ProtectedRoute({ component: Component , ...rest}) {

    const {loading, isAutheticated} = useSelector(state=> state.user)
  return (
    <>
        {
            !loading && (
                <Route 
                    {...rest}
                    render ={props=>{
                        if(!isAutheticated){
                            return <Navigate replace to="/login" />
                        }

                        return <Component {...props}/>
                    }}    
                />
            )
        }
    </>
  )
}
