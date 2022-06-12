import React, { useState } from 'react';

import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logout } from '../../../Actions/userAction';
import Backdrop from "@material-ui/core/Backdrop";

import {SpeedDial, SpeedDialAction} from "@material-ui/lab";
import DashBoardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Img from "../../../assets/gm.png";
import "./Options.scss"

export default function UserOptions({user}) {
  const navigate = useNavigate();
  const [openLink, setOpenLink] = useState(false);
  const dispatch = useDispatch();

  const {cartItems} = useSelector(state => state.cart);

  const options =[
    {icon: <ListAltIcon/>, name: "Orders", func: orders},
    {icon: <ShoppingCartIcon style={{color: cartItems.length>0?"tomato":"unset"}}/>, name: `Cart(${cartItems.length})`, func: cart},
    {icon: <PersonIcon/>, name: "Profile", func: account},
    {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser},
  ];

  if(user.user.role === "admin"){
        options.unshift(
            {icon: <DashBoardIcon/>, name: "Dashboard", func: dashboard},
        )
  };
  function dashboard(){
    navigate("/admin/dashboard")
  }
  function cart(){
    navigate("/cart")
  }
  function orders(){
    navigate("/orders")
  }
  function account(){
    navigate("/account")
  }
  function logoutUser(){
    dispatch(logout());
  }


  return (
    <>
      {/* Backdrop from material-ui/core options={open=open; style=z-index}*/}
      <Backdrop open={openLink} style={{ zIndex: "10" }} />

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpenLink(false)}
        onOpen={() => setOpenLink(true)}
        style={{ zIndex: "11" }}
        open={openLink}
        direction="down"
        className="speedDial"
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
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} tooltipOpen={window.innerWidth <= 600 ? true : false} onClick={item.func}></SpeedDialAction>
          ))
        }
      </SpeedDial>
    </>
  )
}
