import React, {useState, useEffect} from 'react'
import Loading from "../layout/Loading/Loading";
import {useNavigate} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector} from "react-redux";
import {loadUser , updateProfile} from "../../Actions/userAction"
import { Update_Profile_Reset } from '../../Constants/userConstant';

import "./updateProfile.scss"

export default function UpdateProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state=> state.user);
    const {isUpdated, loading} = useSelector(state => state.profile)

    const [imagePrev, setImagePrev] = useState("../../assets/gm.png");
    
    const [userProfile, setUserProfile] = useState({
        name: "",
        email: "",
        avatar: ""
    });
    const {name, email, } = userProfile;



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
                    setUserProfile({...userProfile, avatar: reader.result})
                }
            };
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUserProfile({
                ...userProfile,
                [e.target.name]: e.target.value
            })
        }
    }


   // submit data 
    const updateProfileSubmit = (e)=>{
        e.preventDefault();
        dispatch(
            updateProfile(userProfile)
        )
    };


    useEffect(()=>{

        if(user){
            setUserProfile({
                name: user.user.name,
                email: user.user.email,
                avatar: user.user.avatar.url
            });
            setImagePrev(user.user.avatar.url)
        }


        if(isUpdated){
            dispatch(loadUser());
            
            navigate('/account');

            dispatch({
                type: Update_Profile_Reset
            })

        }
    } , [isUpdated, dispatch, navigate, user])


  return (
      <>
        {
            loading? <Loading/> :
       
    <>
 <div className="updateProfileContainer1">
            <h1>Update Profile</h1>

            <form
                className='updateProForm'
                encType='multipart/form-data'
                onSubmit={updateProfileSubmit}>

                <div className="updateProImage">
                    <img src={imagePrev} alt="user Pic" />

                    <input type="file" name="avatar"
                        accept='image/*'
                        onChange={handleData} />
                </div>

                <div className="updateProNameBox">

                    <FaceIcon/>

                    <input type="text" 
                        name="name"
                        placeholder='Enter your Username'
                        required
                        value={name}
                        onChange={handleData} />

                </div>
                <div className="updateProEmailBox">

                    <MailOutlineIcon/>

                    <input type="email" 
                        name="email"
                        placeholder='Enter your email'
                        required
                        value={email}
                        onChange={handleData} />

                </div>
               


                <input type="submit"
                    className="updateProBtn"
                    value="Update"
                    // disabled ={loading ? true : false} 
                    />
            </form>

        </div>
    
    </>
     }
     </>
    )
}
