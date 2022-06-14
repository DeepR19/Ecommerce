import React from 'react'
import { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {getOrderDetails} from "../../Actions/orderAction";
import Loading from "../layout/Loading/Loading";
import Additional from "../layout/Additional";
import "./orderDetails.scss"
export default function OrderDetails() {
    const {order, loading} = useSelector(state=> state.orderDetails);
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(
            getOrderDetails(id)
        )
    }, [dispatch, id]) 
  return (
    <>
        {
            loading? <Loading/>: order ?(
                <>
                    <Additional title={`Order |`}/>

                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <h3>Order #{order && order._id}</h3>
                            <h5>Shipping Info</h5>

                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name: </p>
                                    <span>{order.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone: </p>
                                    <span>{order.shippingInfo && order.shippingInfo.phone}</span>
                                </div>
                                <div>
                                    <p>Name: </p>
                                    <span>{order.shippingInfo &&
                                     `
                                     ${order.shippingInfo.address}, 
                                     ${order.shippingInfo.city}, 
                                     ${order.shippingInfo.state}, 
                                     ${order.shippingInfo.pinCode}, 
                                     ${order.shippingInfo.country}, 
                                     `}</span>
                                </div>
                            </div>

                            <h3>Payment</h3>

                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.paymentInfo && 
                                            order.paymentInfo.status === "succeeded"?
                                            "greenColor" : "redColor"
                                         }
                                    >
                                        {
                                            order.paymentInfo && 
                                            order.paymentInfo.status === "succeeded"?
                                            ">>> Paid <<<" : " >>> Not Paid <<<"
                                         }
                                    </p>
                                </div>

                                <div>
                                    <p>Amount: </p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>

                            <h3>Order Status</h3>
                            <div className="orderDetailsContainerBox orcb1">
                                <div>
                                    <p className={
                                            order.paymentInfo && 
                                            order.paymentInfo.status === "succeeded"?
                                            "greenColor" : "redColor"
                                         }>
                                             {order.orderStatus && order.orderStatus}
                                         </p>
                                </div>
                            </div>
                                             
                        </div>

                        <div className="orderDetailsCartItems">
                            <h3>Order Items: </h3>

                            <div className="orderDetailsCartItemsContainer">
                                {
                                    order.orderItems && 
                                    order.orderItems.map(item =>(
                                        <div key={item.product}>
                                            <img src={item.image} alt="product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                            <span>
                                                {item.quantity} X {item.price} =
                                                <b>Rs. {item.price * item.quantity}</b>
                                            </span>
                                        </div >
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </>
            ): ""
        }
    </>
  )
}
