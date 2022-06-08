import React from 'react';
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import "./cartItem.scss"

export default function CartItem({item , removeCartItem}) {
  return (
      <>
    <div className="carditem">
        <img src={item.image} alt={item.name} />

        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: Rs. ${item.price}`}</span>
            <p onClick={()=> removeCartItem(item.product)}>Remove</p>
        </div> 
    </div>
      </>
  )
}
