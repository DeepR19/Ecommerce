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

import "./List.scss";

export default function AdminProducts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error, products} = useSelector(state => state.products);
  const {error: deleteErr ,isDeleted} = useSelector(state=>state.product);

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
        type: Delete_Product_Reset
      })
    }

    dispatch(
      getAdminProduct()
    )
  },[dispatch, isDeleted, navigate, error, deleteErr]);


  const delelteProductHandler = (id)=>{
    dispatch(
      deleteProduct(id)
    )
  }

  const columns = [
    {
      field: "id",
      headerName: "ProductID",
      minWidth: 200,
      flex: .5
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: .7
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: .3,
      type: "number"
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      flex: .5,
      type: "number"
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
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <EditIcon/>
              </Link>

              <Button onClick={()=>delelteProductHandler(params.getValue(params.id, "id"))}>
                <DeleteIcon/>
              </Button>
          </>
        )
      }
    },
  ];

  const rows = [];

  products && 
    products.forEach(item=>(
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name
      })
    ));


  return (
    <>
        <Additional title='All Products | Admin'/>

        <div className="dashboard">
          <SideBar/>

          <div className="productListContainer">
            <h1 className="productListHeading">All Products</h1>

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
