import React from 'react';
import { useState } from 'react';
import Loading from "../../layout/Loading/Loading";
import {useNavigate,Link} from "react-router-dom"

import {useSelector, useDispatch} from "react-redux";
import { register } from '../../../Actions/userAction';
import { useEffect } from 'react';



export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imagePrev, setImagePrev] = useState("../../assets/gm.png");
    const {loading, isAuthenticated} = useSelector(state => state.user);
    
    const [user, setUser] = useState({
        name: "",
        email:"",
        password: "",
        avatar: ""
    });
    const {name, email, password} = user;



    // set value of the attrib
    const handleData = (e)=>{
        if(e.target.name === "avatar"){

            const reader = new FileReader();
                // here 2 means file reading is done
                // if readyState = 0  {Means initial}
                // if readyState = 1  {Means processing}

            reader.onload = () =>{
                if(reader.readyState === 2){   
                    setImagePrev(reader.result)
                    setUser({...user, avatar: reader.result})
                }
            };

            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }


   // submit data 
    const registerSubmit = (e)=>{
        e.preventDefault();
        <Loading/>
        
        dispatch(
            register(user)
        )
    };


    useEffect(()=>{
        if(isAuthenticated){
            navigate('/account');
        }
    })
  return (
    <>
        {
            loading? <Loading/>:
        <div className="signupContainer">
            <h1>Signup</h1>

            <form
                className='signupForm'
                encType='multipart/form-data'
                onSubmit={registerSubmit}>

                <div className="signupImage">
                    <img src={imagePrev} alt="user Pic" />

                    <input type="file" name="avatar"
                        accept='image/*'
                        onChange={handleData} />
                </div>

                <div className="SignupNameBox">

                    <input type="text" 
                        name="name"
                        placeholder='Enter your Username'
                        required
                        value={name}
                        onChange={handleData} />

                </div>
                <div className="SignupEmailBox">

                    <input type="email" 
                        name="email"
                        placeholder='Enter your email'
                        required
                        value={email}
                        onChange={handleData} />

                </div>
                <div className="loginPassBox">

                    <input type="password" 
                        name="password"
                        placeholder='Enter your password'
                        required
                        value={password}
                        onChange={handleData} />

                </div>

                <Link to='/login'>Already have an account?</Link>

                <input type="submit"
                    className="signupBtn"
                    value="Register"
                    // disabled ={loading ? true : false} 
                    />
            </form>

        </div>
        }

    </>
  )
}
