import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { logout } from '../../../Actions/userAction';

import {SpeedDial, SpeedDialAction} from "@material-ui/lab";
import DashBoardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"

import Img from "../../../assets/gm.png";

export default function UserOptions({user}) {
  const navigate = useNavigate();
  const [openLink, setOpenLink] = useState(false);
  const dispatch = useDispatch();
  const options =[
    {icon: <ListAltIcon/>, name: "Orders", func: orders},
    {icon: <PersonIcon/>, name: "Profile", func: account},
    {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser},
  ];

  if(user.user.role === "admin"){
        options.unshift(
            {icon: <DashBoardIcon/>, name: "Dashboard", func: dashboard},
        )
  };
  function dashboard(){
    navigate("/dashboard")
  }
  function orders(){
    navigate("/orders")
  }
  function account(){
    navigate("/account")
  }
  function logoutUser(){
    dispatch(logout());
    // alert("logout successful")
  }



  return (
    <>
      {/* Backdrop from material-ui/core options={open=open; style=z-index}*/}
      <SpeedDial

        ariaLabel='SpeedDial tooltip eaxample'
        onClose={()=>setOpenLink(false)}
        onOpen={()=>setOpenLink(true)}
        open={openLink}
      direction='down'
        icon={
          <img
            className='speedDialIcon'
            style={{"height": "40px", "width": "40px"}}
            src={user.user.avatar.url ? user.user.avatar.url :Img}
            alt='profilePic'
          />
        }
      >

        {
          options.map(item=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}></SpeedDialAction>
          ))
        }
      </SpeedDial>
    </>
  )
}
