import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {DataGrid} from "@material-ui/data-grid";
import { MyOrders } from '../../Actions/orderAction';
import Loading from '../layout/Loading/Loading';
import { Link } from 'react-router-dom';
import Additional from '../layout/Additional';
import LaunchIcon from "@material-ui/icons/Launch"
import { useEffect } from 'react';
import "./Myorder.scss"

export default function MyOrder() {
  const dispatch = useDispatch();

  const {user}= useSelector(state => state.user);
  const {order, loading}= useSelector(state => state.myOrders)

  const columns =[
    {
      field: "id", 
      headerName: "Order ID",
      minWidth:150, 
      flex: 1
    },
    {
      field: "status", 
      headerName: "Status",
      minWidth:150, 
      flex: .5,
      cellClassName: params =>{
        return params.getValue(params.id , "status") === "Delivered"?
        "greenColor":
        "redColor"
      }
    },
    {
      field: "itemQty", 
      headerName: "Items Quantity", 
      type: "number",
      minWidth:150, 
      flex: .3
    },
    {
      field: "amount", 
      headerName: "Amount",
      minWidth:150,  
      type: "number",
      flex: .5
    }, // field is similar as name fieled in input
    {
      field: "actions", 
      headerName: "Actions",
      minWidth:150,  
      sortable: false,
      type: "number",
      flex: .3,
      renderCell: (params) =>{
        return(
          //  params.id is used to get value of the columns field {id}          
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon/>
          </Link>
        )
      }
    }, 
    
  ]
  const rows =[]

  order &&  order.forEach((item, index)=>{
    rows.push({
      itemQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice
    })
  })

  useEffect(()=>{
    dispatch(MyOrders())
  },[dispatch])

  return (
      <>
        <Additional title={`${user.name}'s Orders`}/>

        {loading ? <Loading/> :(
          <div className="myOrderPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disabledSelectionOnClick
              className="myOrderTable"
              autoHeight
            />

            <h3>{user.name}</h3>
          </div>
        )}
      </>
    )
}
