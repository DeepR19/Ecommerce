import React, {useEffect, useState} from 'react';
import Loading from "../../layout/Loading/Loading"
import {Link, useLocation, useNavigate} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"

import {useSelector, useDispatch} from "react-redux";
import {login} from "../../../Actions/userAction";
import "./LoginSignup.scss"

export default function Login() {
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")
    // const location = useLocation();

    const navigate = useNavigate()

    const {loading , isAuthenticated} = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleLogin = (e)=>{
        e.preventDefault();

        dispatch(
            login(email, password)
        )
    };

    const redirect =  window.location.search? window.location.search.split("=")[1] : "/account";  // it will return the req.query like statement
    useEffect(()=>{
        if(isAuthenticated){
            navigate(redirect)
        }
    }, [isAuthenticated, redirect, navigate])

  return (
    <>
    {loading ? <Loading/> : 
        <div className="loginContainer">
            <h1>Login</h1>

            <form onSubmit={handleLogin} >
                <div className="loginEmailBox">

                    <MailOutlineIcon/>

                    <input type="email" 
                        name="email"
                        placeholder='Enter your email'
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} />

                </div>
                <div className="loginPassBox">

                    <LockOpenIcon/>

                    <input type="password" 
                        name="password"
                        placeholder='Enter your password'
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} />

                </div>

                <div className='LoginLink1'>

                    <Link to="/password/forgot">Forgot Password?</Link>
                    <Link to="/signup">Make an Account?</Link>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    }
    </>
  )
}
