import React from 'react';
import CheckOutStep from "./CheckOutStep";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";


export default function OrderConfirm() {
    const navigate = useNavigate();
    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.user)

    const address = `
    ${shippingInfo.address}, 
    ${shippingInfo.city}, 
    ${shippingInfo.state}, 
    ${shippingInfo.pinCode}, 
    ${shippingInfo.country}, 
    
    `

    const subtotal =cartItems.reduce(
        (acc, item) => acc + (item.price * item.quantity),
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 300;

    const tax = subtotal * .18

    const totalPrice = subtotal + tax + shippingCharges;

    
    const handleProceed = ()=>{
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate('/payment')
    }

  return (
    <>
        <CheckOutStep activeSteps={1}/>

        <div className="confirmOrders">
            <div>
                <h3>Shipping Info</h3>

                <div className="shoppingAreaBox">
                    <div>
                        <p>Name: </p>
                        <span>{user.user.name}</span>
                    </div>
                    <div>
                        <p>Phone: </p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address: </p>
                        <span>{address}</span>
                    </div>
                </div>
            </div>
            
            <div className="confirmCartItem">
                <h3>Your Cart Item</h3>

                <div className="confirmCartItemContainer">
                    {
                        cartItems && cartItems.map(item => (
                            <div key={item.product}>
                                <img src={item.image} alt={item.product} />

                                <Link to={`/product/${item.product}`}>{item.name}</Link>

                                <span>
                                    {item.quantity} X {item.price} = 
                                    <b>Rs. {item.quantity * item.price}</b>
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
                {/*  */}
            <div>
                <div className="orderSummary">
                    <h3>Order Summary</h3>

                    <div>
                        <p>SubTotal: </p>
                        <span>Rs. {subtotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges: </p>
                        <span>Rs. {shippingCharges}</span>
                    </div>
                    <div>
                        <p>GST: </p>
                        <span>Rs. {tax}</span>
                    </div>
                </div>

                <div className="ordersSummaryTotal">
                    <p>
                        <b>Total :</b>
                    </p>
                    <span>Rs. {totalPrice}</span>
                </div>

                <button onClick={handleProceed}> Proceed To Payment </button>
            </div>
        </div>
    </>
  )
}
