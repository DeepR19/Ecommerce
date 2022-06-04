import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from "../layout/Header/Header";
import Product from './Product';

import Additional from '../layout/Additional';

import { getProduct } from '../../Actions/productAction';
import "./home.scss";



export default function Home() {

  const dispatch = useDispatch();

  // this data is come from productReducer module
  const {loading, error, products, productsCount} = useSelector(state => state.products)

  useEffect(()=>{
    dispatch(getProduct())  // this send res to the productAction module
  } , [dispatch])

  return (
    <>
    {/* additional is used to add meta data about page */}
      <Additional title="DeepR19 | Ecommerce"/>

      <Header/>

      <div className="homeContainer">
        <p>Welcome to Ecommerce</p>

        <h1>Find Amazing products Below</h1>

        <a href="...">
          <button>
            Scroll
          </button>
        </a>
      </div>


      <div className="homeHeading">
        Featured Products
      </div>

      <div className="container" id="container">
        {
          products && products.map((item)=>(
            <Product product={item} />

          ))
        }
      </div> 
    </>
  )
}
