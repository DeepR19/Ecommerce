import React, {useState, useEffect} from 'react'
import Loading from "../layout/Loading/Loading";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {updatePassword} from "../../Actions/userAction"
import { Update_Password_Reset } from '../../Constants/userConstant';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpenKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";

export default function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isUpdated, loading} = useSelector(state => state.profile)

    const [imagePrev, setImagePrev] = useState("../../assets/gm.png");
    
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    // const {old, new, confirm} = password

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
            updatePassword(password)
        )
    };


    useEffect(()=>{

        if(isUpdated){
            navigate('/account');

            dispatch({
                type: Update_Password_Reset
            })

        }
    } , [isUpdated, dispatch, navigate])

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

            <div className="SignupNameBox">
                <VpenKeyIcon/>

                <input type="password" 
                    name="oldPassword"
                    placeholder='Enter your old Password'
                    required
                    value={password.oldPassword}
                    onChange={handleData} />

            </div>
            <div className="SignupEmailBox">
            <LockOpenIcon/>

                <input type="password" 
                    name="newPassword"
                    placeholder='Enter New Password'
                    required
                    value={password.newPassword}
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
