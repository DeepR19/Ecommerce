import React from 'react';
import Additional from '../layout/Additional';
import {Link, useNavigate} from "react-router-dom";
import Loading from "../layout/Loading/Loading";
import {useSelector} from "react-redux";
import { useEffect } from 'react';

export default function Account({user}) {
  const navigate = useNavigate()
  const {loading, isAuthenticated} = useSelector(state => state.user);

  useEffect(()=>{
    if(isAuthenticated === false){
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (

    <>
      {
        !loading && isAuthenticated ? 
      
    <>
        <Additional title={`${user.user.name}'s Profile`}/>
       
       <div className="profileContainer">
         <div>
           <h1>My Profile</h1>
           <img src={user.user.avatar.url} alt={user.user.name} />
           <Link to="/me/update">Edit Profile</Link>
         </div>

         <div>
           <div>
             <h4>FullName</h4>
             <p>{user.user.name}</p>
           </div>

           <div>
             <h4>Email</h4>
             <p>{user.user.email}</p>
           </div>
           
           {/* <div>
             {
               user.user.createdAt ?
              (
                <>
                  <h4>Joined At</h4>
                  <p>{user.user.createdAt}</p>)
                </>
              )
                : {}}
           </div> */}

           <div>
             <Link to='/orders'>My Orders</Link>
             <Link to='/password/update'>Change Password</Link>
           </div>
         </div>
       </div>
    </>: <Loading/>
}</>
  )
}
