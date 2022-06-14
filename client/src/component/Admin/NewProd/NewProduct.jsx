import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import { createProduct } from '../../../Actions/productAction';
import { Button } from '@material-ui/core';
import SideBar from '../SideBar';
import { New_Product_Reset } from '../../../Constants/productConstant';
import Loading from "../../layout/Loading/Loading"
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useState } from 'react';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

export default function NewProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, success, error} = useSelector(state => state.newProduct)

  const [data, setData] = useState({
    name:'',
    price:0,
    description: "",
    category : "",
    Stock: "",
    images: []
  })

  // const [price, setPrice] = useState(0)
  // const [Stock, setStock] = useState(0)
  // const [desc, setDesc] = useState("")
  // const [category, setCategory] = useState("")
  const [images, setImages] = useState([])
  const [imagePrev, setImagePrev] = useState([]);

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
  if(success){
    navigate("/admin/dashboard")
    dispatch({type: New_Product_Reset})
  }
  if(error){
    alert("Try another Images")
  }
}, [dispatch, navigate, success, error])

const submitHadler = (e)=>{
  e.preventDefault();

  const myForm = new FormData()

  myForm.set("name", data.name)
  myForm.set("price", data.price)
  myForm.set("description", data.description)
  myForm.set("category", data.category)
  myForm.set("Stock", data.Stock)

  images.forEach(image =>{
    myForm.append('images', image)
  })

  dispatch(
    createProduct(myForm)
  )
};

const createProdImagesChange = (e) =>{
  const files = Array.from(e.target.files);

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
    {
      loading?<Loading/>:
        <div className="dashboard  dash1">
          <SideBar/>

          <div className="newProductContainer">
            <form
              className='createProductForm'
              encType='multipart/form-data'
              onSubmit={submitHadler}
            >
              <h1>Create Product</h1>

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

                <select name="category" 
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
                  onChange={e=>setData({...data, Stock:e.target.value})} />
              </div>

              <div id="createProductFormFile">
                <input type="file" name="avatar" accept='image/*' onChange={createProdImagesChange} multiple/>
              </div>

              <div id="createProductFormImage">
                {
                  imagePrev.map((image, index)=>(
                    <img src={image} alt="Avatar" key={index} />
                  ))
                }

              </div>

              <Button 
                id="createProductBtn"
                type= "submit"
                disabled= {loading ?true: false}
              >Create</Button>

            </form>
          </div>
        </div>
}
    </>
  )
}
