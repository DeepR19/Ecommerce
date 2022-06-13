import React from 'react'
import CartItem from "./CartItem";
import "./Cart.scss";
import {useSelector, useDispatch} from "react-redux";
import {addItemToCart, RemoveFromCart} from "../../Actions/cartAction";
import { useNavigate } from 'react-router-dom';
import "./Cart.scss"

export default function Cart() {
    // const [data, setData]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state=> state.cart);

   const increasePrice =(id, quantity, stock)=>{
        // const newQuantity = quantity +1;
        // if(stock <= quantity){
        //     return
        // }
        // dispatch(
        //     addItemToCart(id, newQuantity)
        // )
   };

   const decreasePrice =(id, quantity)=>{
        // const newQuantity = quantity -1;
        // if(1 >= quantity){
        //     return
        // }
        // dispatch(
        //     addItemToCart(id, newQuantity)
        // )
   };

   const removeCartItem =(id)=>{
       dispatch(RemoveFromCart(id))
   };

   const handleShipping =()=>{
       navigate("/login?redirect=shipping")
   }

  return (
    <>
    {cartItems.length === 0 ? "No Item Present" :
    <>
        <div className="cartPage">
            <div className="cartHeadar">
                <p>Products</p>
                <p>Quantity</p>
                <p>SubTotal</p>
            </div>


        {/* Adding Cart itrem row */}
        <div className="CartCont">

        {
            cartItems && cartItems.map(item=>(
                <div className="cartContainer" key={item.product}>
                    <CartItem item={item} removeCartItem = {removeCartItem}/>

                    <div className="cartInput">
                        <button onClick={decreasePrice(item.product, item.quantity)}>-</button>
                        <input type="number" value={item.quantity} readOnly/>
                        <button onClick={increasePrice(item.product, item.quantity, item.stock)}>+</button>
                    </div>

                    <p className='cardSubtotal'>{`Rs. ${
                        item.price * item.quantity
                    }`}</p>
                </div>
            ))
        }
        </div>

        


        <div className="cartGrossPrice">
            <div></div>
            <div className="GrossPriceBox">
                <p>Gross Total</p>




                <p>{`Rs. ${
                    // here acc means store area
                    // item is the single item of cartItems
                    // .reduce function is check every single item then retuen a single Output
                    // not known the use of '0' in this [atlast]
                    // it constantly check the data is updating or not {if update then show the o/p}
                    cartItems.reduce((acc, item)=> acc + (item.quantity * item.price), 0)
                }`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
                <button onClick={handleShipping}>Check Out</button>
            </div>
        </div>

        </div>

        </>
    }
    </>
  )
}
