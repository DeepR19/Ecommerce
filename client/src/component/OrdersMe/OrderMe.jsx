import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';

export default function OrderMe() {
    const [order, setOrder] = useState();
    useEffect(()=>{
        const orders = async () =>{
            const {data} = await axios.get('/api/vi/orders/me');
            setOrder(data);
        };

        orders();

    })

  return (
    <>
        <div>OrderMe</div>
        {
            order.orders[0] && order.success ? <h1>start Mapping</h1> : <h4>Nothing</h4>
        }
    </>

    
  )
}
