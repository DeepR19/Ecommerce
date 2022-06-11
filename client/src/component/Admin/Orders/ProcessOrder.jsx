import React from 'react';
import { useEffect, useState } from 'react';
// import CheckOutStep from "./CheckOutStep";
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import { clearErr,getOrderDetails, updateOrder } from '../../../Actions/orderAction';
import SideBar from '../SideBar';
import Loading from '../../layout/Loading/Loading';
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import { Button } from '@material-ui/core';
import { Update_Order_Reset } from '../../../Constants/orderConstant';

export default function ProcessOrder() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {id} = useParams()

    const [status, setStatus]=useState("");

    const {order, error, loading} = useSelector(state => state.orderDetails);
    const {error: updateError ,isUpdated } = useSelector(state => state.order);

    useEffect(()=>{
        if(error){
            alert(error);
            dispatch(clearErr)
        }
        if(updateError){
            alert(error);
            dispatch(clearErr)
        }
        if(isUpdated){
            alert("DONE")
            dispatch({type: Update_Order_Reset})
        }
        dispatch(
            getOrderDetails(id)
        )
    }, [dispatch, id, error, isUpdated, updateError]) 


    const submitHandler = (e) =>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("status", status);

        dispatch(
            updateOrder(id, myForm)
        );
    }
    // const address = `
    // ${shippingInfo.address}, 
    // ${shippingInfo.city}, 
    // ${shippingInfo.state}, 
    // ${shippingInfo.pinCode}, 
    // ${shippingInfo.country}, 
    // `;

    // const subtotal =cartItems.reduce(
    //     (acc, item) => acc + (item.price * item.quantity),
    //     0
    // );

    // const shippingCharges = subtotal > 1000 ? 0 : 300;

    // const tax = subtotal * .18

    // const totalPrice = subtotal + tax + shippingCharges;

    
    // const handleProceed = ()=>{
    //     const data = {
    //         subtotal,
    //         shippingCharges,
    //         tax,
    //         totalPrice
    //     };

    //     sessionStorage.setItem("orderInfo", JSON.stringify(data));

    //     navigate('/payment')
    // }

  return (
    <>
  <>
        <div className="dashboard">
          <SideBar/>

          <div className="newProductContainer">
                {
                    loading ? <Loading/>:
                    order?
                    <div className="confirmOrders"
                        style={{
                            display: order.orderStatus === "Deliveres"? "block": "grid"
                        }}>
            <div>
                <h3>Shipping Info</h3>

                <div className="shoppingAreaBox">
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
                            <p>Address: </p>
                            <span>{order && order.shippingInfo &&
                                `
                                ${order.shippingInfo.address}, 
                                ${order.shippingInfo.city}, 
                                ${order.shippingInfo.state}, 
                                ${order.shippingInfo.pinCode}, 
                                ${order.shippingInfo.country}, 
                                `}</span>
                        </div>
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
                                "Paid" : "Not Paid"
                            }
                        </p>
                    </div>

                    <div>
                        <p>Amount: </p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                </div>

                <h3>Order Status</h3>
                <div className="orderDetailsContainerBox">
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
            
            <div className="confirmCartItem">
                <h3>Your Cart Item</h3>

                <div className="confirmCartItemContainer">
                    {
                        order.orderItems && order.orderItems.map(item => (
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
            <div style={{
                display: order.orderStatus === "Delivered" ? "none": 
                "block"
            }}>
            <form
              className='createProductForm'
              encType='multipart/form-data'
              onSubmit={submitHandler}
            >
              <h1>Process Order</h1>

              <div>
                <AccountTreeIcon/>

                <select name="category" 
                  onChange={e=>setStatus(e.target.value)}>
                      
                      <option value="">Choose Category</option>

                      {order.orderStatus === "Processing" &&
                       <option value="Shipped">Shipped</option>
                      }     
                      {order.orderStatus === "Shipped"&&
                      <option value="Delivered">Delivered</option>
                      }

                  </select>
              </div>

              

              <Button 
                id="createProductBtn"
                type= "submit"
                disabled= {loading ?true: false || status===""? true:false}
              >Create</Button>

            </form>
            </div>
        </div>:""
                }
          </div>
        </div>
    </>
       
    </>
  )
}
