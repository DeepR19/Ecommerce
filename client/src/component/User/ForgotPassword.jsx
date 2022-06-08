import React from 'react';
import Loading from "../layout/Loading/Loading"
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/userAction';
import Additional from '../layout/Additional';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const {message, loading} = useSelector(state => state.forgotPassword)

    const handlePassword = (e)=>{
        e.preventDefault();

        dispatch(forgotPassword(email));
    }
    useEffect(()=>{
        if(message){
            alert(message);
        }
    },[dispatch, message])
  return (
    <>
        {loading ? <Loading/> : 
        <div className="loginContainer">
            <h1>Forgot Password</h1>

            <form onSubmit={handlePassword} >
                <div className="loginEmailBox">


                    <input type="email" 
                        name="email"
                        placeholder='Enter your email'
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} />

                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    }
    </>
  )
}
