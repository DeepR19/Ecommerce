import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import { updateProduct, getProductDetails, clearErr } from '../../../Actions/productAction';
import { Button } from '@material-ui/core';
import SideBar from '../SideBar';
import { Update_Product_Reset } from '../../../Constants/productConstant';

import AccountTreeIcon from "@material-ui/icons/AccountTree"
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useState } from 'react';
import { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

import "../NewProd/New.scss"

export default function UpdateProduct() {
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const {loading, error: updateError, isUpdated} = useSelector(state => state.product)
  const {error, product} = useSelector(state => state.productDetails)

  const [data, setData] = useState({
    name:'',
    price:0,
    description: "",
    category : "",
    Stock: "",
  })
  const [select ,setSelect] = useState(true)
  const [images, setImages] = useState([])
  const [imagePrev, setImagePrev] = useState([]);
  const [oldImage, setOldImage] = useState([]);

  const categories =[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smart Phone"
];

useEffect(()=>{
    if(select){

        dispatch(getProductDetails(id))
    }

    if(product){
        if(product && product._id !== id){
            setSelect(false)
            dispatch(getProductDetails(id))
        }else{
            setData({
                name: product.name,
                price: product.price,
                description: product.description,
                category : product.category,
                Stock: product.Stock
            });
            setOldImage(product.images)
        }
        setSelect(false)
    }
    if(error){
        dispatch(clearErr())
    }
    if(updateError){
        dispatch(clearErr())
    }

  if(isUpdated){
    navigate("/admin/products")
    dispatch({type: Update_Product_Reset})
  }
}, [dispatch, navigate, isUpdated,updateError, product, select, id, error])

const submitHadler = (e)=>{
  e.preventDefault();

  const myForm = new FormData()
  myForm.set("name", data.name)
  myForm.set("price", data.price)
  myForm.set("description", data.description)
  myForm.set("category", data.category)
  myForm.set("Stock", data.Stock)

  images.forEach(image =>{
    myForm.append('images', images)
  })

  dispatch(
    updateProduct(id, myForm)
  )
};


const createProdImagesChange = (e) =>{
  const files = Array.from(e.target.files);

  setOldImage([])
  setImages([])
  setImagePrev([])

  files.forEach(item=>{
    const reader = new FileReader();

    reader.onload = () => {
      if(reader.readyState === 2){
        setImagePrev(old => [...old, reader.result]);
        setImages(old => [...old, reader.result])
      }
    };

    reader.readAsDataURL(item)
  });

}

  return (
    <>
        <div className="dashboard dash1">
          <SideBar/>

          <div className="newProductContainer">
            <form
              className='createProductForm'
              encType='multipart/form-data'
              onSubmit={submitHadler}
            >
              <h1>Update Product</h1>

              <div>
                <SpellcheckIcon/>
                <input type="text"
                       placeholder='Product Name'
                       required
                       value={data.name}
                       onChange={e=>setData({...data, name:e.target.value})}
                  />
              </div>

              <div>
                <AttachMoneyIcon/>
                <input type="number"
                       placeholder='Price'
                       required
                       value={data.price}
                       onChange={e=>setData({...data, price:e.target.value})}
                  />
              </div>

              <div>
                <DescriptionIcon/>
                <textarea name="data" cols="30" rows="1"
                  placeholder='Product Description'
                  value={data.description}
                  onChange={e=>setData({...data, description:e.target.value})}></textarea>
              </div>

              <div>
                <AccountTreeIcon/>

                <select value={data.category} name="category" 
                  onChange={e=>setData({...data, category: e.target.value})}>
                    <option value="">Choose Category</option>

                    {categories.map(item=>(
                      <option key={item} value={item}> {item}</option>
                    ))}
                  </select>
              </div>

              <div>
                <StorageIcon/>

                <input type="number"
                  placeholder='Stock'
                  required
                  value={data.Stock}
                  onChange={e=>setData({...data, Stock:e.target.value})} />
              </div>

              <div id="createProductFormFile">
                <input type="file" name="avatar" accept='image/*' onChange={createProdImagesChange} multiple/>
              </div>

              <div id="createProductFormImage">
                {
                  imagePrev.map((image, index)=>(
                    <img src={image} alt="images" key={index} />
                  ))
                }
              </div>
              <div id="createProductFormImage">
                {   oldImage &&
                  oldImage.map((image, index)=>(
                    <img src={image.url} alt="old Images" key={index} />
                  ))
                }
              </div>

              <Button 
                id="createProductBtn"
                type= "submit"
                disabled= {loading ?true: false}
              >Update</Button>

            </form>
          </div>
        </div>
    </>
  )
}
