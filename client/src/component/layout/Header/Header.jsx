import React from 'react';
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search"
import {useDispatch, useSelector} from "react-redux";
import AcIcon from "@material-ui/icons/AccountCircle"
import ShopIcon from "@material-ui/icons/ShoppingCart"
import Logout from "@material-ui/icons/ArrowBackOutlined"
import "./Header.scss";
import { useEffect } from 'react';
import { loadUser } from '../../../Actions/userAction';
import Img from "../../../assets/logo.PNG"

export default function Header() {
  let dov = document.querySelector('.hamBurderHome');
  const ham = ()=>{
      document.querySelector(".headerContainer").classList.toggle("active")
      dov.classList.toggle("active")
  }

  window.addEventListener("resize",()=>{
      if(window.outerWidth > 1200){
          document.querySelector(".headerContainer").classList.remove("active")
          dov.classList.remove("active")
      }

  });
  
  
  const {isAuthenticated} = useSelector(state => state.user);
  const dispatch = useDispatch()

  // based on login header will change
  

  useEffect(()=>{
    dispatch(loadUser())
  }, [dispatch])
  

  return (
    <>
      {/* <div className="hamBurderHome"> */}
      <div className="hamBurderHome" onClick={ham}>
        <li></li>
        <li></li>
        <li></li>
      </div>
    <div className='headerContainer'>
      

        <div className="headerImg">
          <img src={Img} alt="" />
        </div>

        <div className="headerLinks">
          <ul>
            <Link to="/">
                <li>Home</li>
            </Link>
            <Link to="/products">
                <li>Products</li>
            </Link>
            <Link to="/about">
                <li>About</li>
            </Link>
            <Link to="/contact">
                <li>Contact</li>
            </Link>
          </ul>
        </div>

        <div className="headerSideLinks">
          <Link to="/search">
              <SearchIcon/>
          </Link>
          <Link to="/cart">
              <ShopIcon/>
          </Link>
        {
          !isAuthenticated && <Link to="/login" className='loginPin'>
            <AcIcon/>
          </Link>
        }
        </div>
    </div>
    </>
  )
}
