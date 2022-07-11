import React, { useEffect, useState } from 'react'
import {DataGrid} from "@material-ui/data-grid";
import {useSelector, useDispatch} from "react-redux";
import {clearErr, getAllReviews, deleteReviews} from "../../../Actions/productAction";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@material-ui/core";
import Additional from "../../layout/Additional";
import SideBar from "../SideBar"
import Star from "@material-ui/icons/Star"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {deleteProduct } from "../../../Actions/productAction";
import {Delete_Product_Reset, Delete_Review_Reset} from "../../../Constants/productConstant"

import "./review.scss"


export default function ProdReviews() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error: deleteErr, isDeleted} = useSelector(state => state.review);
  const {error,reviews, loading: uploading} = useSelector(state=>state.productReviews);
const [id ,setId] = useState("");


  useEffect(()=>{
    if(id.length === 24){
        dispatch(getAllReviews(id))
    }
    if(error){
      dispatch(clearErr())
    }
    if(deleteErr){
      dispatch(clearErr())
    }

    if(isDeleted){
      alert("Yes deleted")
      navigate("/admin/reviews")
      dispatch({
        type: Delete_Review_Reset
      })
    }

  },[dispatch, isDeleted, navigate, error, deleteErr, id]);


  const delelteReviewHandler = (reviewId)=>{
    dispatch(
      deleteReviews(reviewId,id)
    )
  }

  const columns = [
    {
      field: "id",
      headerName: "ReviewID",
      minWidth: 200,
      type: "number",
      flex: .5
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 150,
      flex: .3,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 270,
      flex: .5,
      type: "number",
      cellClassName: params=>{
          return params.getValue(params.id, "rating") >= 3?
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

              <Button className="BTR" onClick={()=>delelteReviewHandler(params.getValue(params.id, "id"))}>
                <DeleteIcon/>
              </Button>
          </>
        )
      }
    },
  ];

  const rows = [];

  reviews && 
    reviews.forEach(item=>(
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name
      })
    ));


    const submitHadler =(e)=>{
        e.preventDefault();

        dispatch(getAllReviews(id))
    }

  return (
    <>
        <Additional title='All Reviews | Admin'/>

        <div className="dashboard">
          <SideBar/>

          <div className="productListContainer">
          <form
              className='createProductForm ReForm'
              onSubmit={submitHadler}
            >
              <h1>All Reviews</h1>

              <div>
                <Star/>
                <input type="text"
                       placeholder='Name'
                       required
                       value={id}
                       onChange={e=>setId(e.target.value)}
                  />
              </div>


              <Button 
                id="createProductBtn"
                type= "submit"
                disabled= {uploading ?true: false || id === "" ?true: false}
              >Update</Button>

            </form>


          

            {
                reviews && reviews.length > 0 ?
                <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable broTable'
              autoHeight
            ></DataGrid>:
            "No Reviews"
            }
        
          </div>
        </div>
    </>
  )
}
