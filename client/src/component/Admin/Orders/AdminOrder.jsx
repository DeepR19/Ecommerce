import React, { useEffect } from 'react'
import {DataGrid} from "@material-ui/data-grid";
import {useSelector, useDispatch} from "react-redux";
import {clearErr, getAdminProduct} from "../../../Actions/productAction";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@material-ui/core";
import Additional from "../../layout/Additional";
import SideBar from "../SideBar"

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {deleteProduct } from "../../../Actions/productAction";
import {Delete_Product_Reset} from "../../../Constants/productConstant"
import { deleteOrder, getAllOrders } from '../../../Actions/orderAction';
import { Delete_Order_Reset } from '../../../Constants/orderConstant';

export default function AdminOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error, order} = useSelector(state => state.allOrders);
  
//  for delete redux store
  const {error: deleteErr ,isDeleted} = useSelector(state=>state.order);


  useEffect(()=>{

    if(error){
      dispatch(clearErr())
    }
    if(deleteErr){
      dispatch(clearErr())
    }

    if(isDeleted){
      alert("Yes deleted")
      navigate("/admin/dashboard")
      dispatch({
        type: Delete_Order_Reset
      })
    }

    dispatch(
      getAllOrders()
    )
  },[dispatch, isDeleted, navigate, error, deleteErr]);


  const delelteOrderHandler = (id)=>{
    dispatch(
      deleteOrder(id)
    )
  }

  const columns = [
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
      },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: .3,
      type: "number",
      sortable: false,
      renderCell : params =>{
        return (
          <>
              <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon/>
              </Link>

              <Button onClick={()=>delelteOrderHandler(params.getValue(params.id, "id"))}>
                <DeleteIcon/>
              </Button>
          </>
        )
      }
    },
  ];

  const rows = [];

  order && 
  order.forEach(item=>(
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus
      })
    ));


  return (
    <>
        <Additional title='All Orders | Admin'/>

        <div className="dashboard">
          <SideBar/>

          <div className="productListContainer">
            <h1 className="productListHeading">All Orders</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            ></DataGrid>
          </div>
        </div>
    </>
  )
}
