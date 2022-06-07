import React from 'react';
import Additional from '../layout/Additional';

export default function Account({user}) {
  return (
    <>
        <Additional title={`Ecommerce | Profile`}/>
        {/* {
          user.user ? (
          user.user.name,
          user.user.email,
          user.user.role): "Nothing"
        } */}
        <h1>{user ? "Hai" : "nahi hai"}</h1>
        
        <h1>Hello {user.user.name}</h1>
        <h1>Hello {user.user.email}</h1>
        <h1>Hello {user.user.role}</h1>
    </>
  )
}
