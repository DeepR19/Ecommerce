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
import {deleteUser, getAllUsers } from "../../../Actions/userAction";
import {Delete_Product_Reset} from "../../../Constants/productConstant"

export default function UsersList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error, users} = useSelector(state => state.allUsers);
  const {error : deleteErr, isDeleted, message} = useSelector(state=>state.profile)
  
  
useEffect(()=>{

    if(error){
      dispatch(clearErr())
    }
    if(deleteErr){
      dispatch(clearErr())
    }

    if(isDeleted){
      alert("Yes deleted")
      navigate("/admin/users")
      dispatch({
        type: Delete_Product_Reset
      })
    }

    dispatch(
      getAllUsers()
    )
  },[dispatch, error, deleteErr, isDeleted, navigate]);

  


  const delelteUserHandler = (id)=>{
    dispatch(
      deleteUser(id)
    )
  }

  const columns = [
    {
      field: "id",
      headerName: "UserID",
      minWidth: 250,
      type: "number",
      flex: .7
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 280,
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 170,
      flex: .3,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: .2,
      cellClassName: params =>{
        return params.getValue(params.id , "role") === "admin"?
        "greenColor":
        "redColor"
      }
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
              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                <EditIcon/>
              </Link>

              <Button onClick={()=>delelteUserHandler(params.getValue(params.id, "id"))}>
                <DeleteIcon/>
              </Button>
          </>
        )
      }
    },
  ];

  const rows = [];


  users && 
    users.forEach(item=>(
      rows.push({
        id: item._id,
        email: item.email,
        role: item.role,
        name: item.name
      })
    ));


  return (
    <>
        <Additional title='All Users | Admin'/>

        <div className="dashboard">
          <SideBar/>

          <div className="productListContainer">
            <h1 className="productListHeading">All Users</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable1'
              autoHeight
            ></DataGrid>
          </div>
        </div>
    </>
  )
}
