import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import { clearErr, createProduct } from '../../../Actions/productAction';
import { Button } from '@material-ui/core';
import SideBar from '../SideBar';
import { New_Product_Reset,  } from '../../../Constants/productConstant';
import { Update_Users_Reset,  } from '../../../Constants/userConstant';

import {getUserDetails, updateUser} from "../../../Actions/userAction"
import { useState } from 'react';
import { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

import PersonIcon from "@material-ui/icons/Person"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser"
import Loading from "../../layout/Loading/Loading";

export default function UpdateUser() {
    const {id} = useParams();
  const navigate = useNavigate()
  const [select ,setSelect]  = useState(1);
  const dispatch = useDispatch()

  const {loading, error, user} = useSelector(state => state.userDetails)
  const {loading:uploading, isUpdated, error: updateErr} = useSelector(state => state.profile)

  const [data, setData] = useState({
    name:'',
    email: "",
    role: ""
  })


  useEffect(()=>{

    if(!user || user._id !== id){
        dispatch(getUserDetails(id))
    }else{
        if(user){

            setData({
                name: user.name,
                email: user.email,
                role: user.role
            })
        }
        setSelect(0)
    }
    console.log(user)
       

    if(error){
        console.info(error)
        dispatch(clearErr)
    }
    if(updateErr){
        console.info(updateErr)
        dispatch(clearErr)
    }
    if(isUpdated){
        navigate("/admin/users")
        dispatch({type: Update_Users_Reset})
    }
        // dispatch(getUserDetails(id))

 
}, [dispatch, navigate, error, isUpdated,id,select, updateErr, user])

const submitHadler = (e)=>{
  e.preventDefault();

  const myForm = new FormData()
  myForm.set("name", data.name)
  myForm.set("email", data.email)
  myForm.set("role", data.role)
 

//   images.forEach(image =>{
//     myForm.append('images', images)
//   })

  dispatch(
    updateUser(id, myForm)
  )
};



  return (
    <>
        {/* {user  ?  */}
        <div className="dashboard">
          <SideBar/>

          <div className="newProductContainer">
              {
                  loading ? <Loading/>:
                  user?
            <form
              className='createProductForm'
              onSubmit={submitHadler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon/>
                <input type="text"
                       placeholder='Name'
                       required
                       value={data.name}
                       onChange={e=>setData({...data, name:e.target.value})}
                  />
              </div>

              <div>
                <MailOutlineIcon/>
                <input type="email"
                       placeholder='Email'
                       required
                       value={data.email}
                       onChange={e=>setData({...data, email:e.target.value})}
                  />
              </div>

              

              <div>
                <VerifiedUserIcon/>

                <select name="category" value={data.role}
                  onChange={e=>setData({...data, role: e.target.value})}>
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>

                    
                  </select>
              </div>

              


           

              <Button 
                id="createProductBtn"
                type= "submit"
                disabled= {uploading ?true: false || data.role === "" ?true: false}
              >Update</Button>

            </form>:""
}
          </div>
        </div>
        {/* :""} */}
    </>
  )
}
