import React from 'react';
import {Link} from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default function OrderSuccess() {
  return (
    <>
        <div className="orderSuccess">
            <CheckCircleIcon/>

            <h3>Your Order has been Placed Successfully</h3>
            <Link to="/orders">View Orders</Link>
        </div> 
    </>
    )
}
