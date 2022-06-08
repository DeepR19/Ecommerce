import React, {useState, useEffect} from 'react'
import Loading from "../layout/Loading/Loading";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { resetPassword } from '../../Actions/userAction';

export default function ResetPassword() {

    const dispatch = useDispatch();

    const token = useParams();
    const navigate = useNavigate();

    const {success, loading} = useSelector(state => state.forgotPassword)

    
    const [password, setPassword] = useState({
        password: "",
        confirmPassword: ""
    });

    // set value of the attrib
    const handleData = (e)=>{
       
            setPassword({
                ...password,
                [e.target.name]: e.target.value
            })
    }


   // submit data 
    const updateProfileSubmit = (e)=>{
        e.preventDefault();
        dispatch(
            resetPassword(token, password)
        )
    };


    useEffect(()=>{

        if(success){
           alert("Password Updated")

           navigate("/login")
        }
    } , [success, dispatch, navigate])

  return (
    <>
    {
        loading? <Loading/> :
   
<>
<div className="updateProfileContainer">
        <h1>Update Password</h1>

        <form
            className='signupForm'
            encType='multipart/form-data'
            onSubmit={updateProfileSubmit}>

           
            <div className="SignupEmailBox">
            <LockOpenIcon/>

                <input type="password" 
                    name="newPassword"
                    placeholder='Enter New Password'
                    required
                    value={password.Password}
                    onChange={handleData} />

            </div>
            <div className="SignupEmailBox">
            <LockIcon/>

                <input type="password" 
                    name="confirmPassword"
                    placeholder='Confirm your password'
                    required
                    value={password.confirmPassword}
                    onChange={handleData} />

            </div>
           


            <input type="submit"
                className="signupBtn"
                value="updateProfile"
                // disabled ={loading ? true : false} 
                />
        </form>

    </div>

</>
 }
 </>
  )
}
