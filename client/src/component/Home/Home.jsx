import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from "../layout/Header/Header";
import ProductCard from './ProductCard';

import Additional from '../layout/Additional';

import { getProduct } from '../../Actions/productAction';
import "./home.scss";
import Loading from '../layout/Loading/Loading';

// import {useAlert} from "react-alert";

export default function Home() {
 

  // const alert = userAlert();

  const dispatch = useDispatch();

  // this data is come from productReducer module
  const {loading, error, products, productsCount} = useSelector(state => state.products)

  useEffect(()=>{

    // if(error){
    //   return alert.error(error);
    // }

    dispatch(getProduct())  // this send res to the productAction module
  } , [dispatch])
  // error in dependency
  return (
    <> 
      
      { loading? 
          <Loading/>:(
          <>
          {/* additional is used to add meta data about page */}
            <Additional title="DeepR19 | Ecommerce"/>

            <div className="homeContainer">

            
              <p>Welcome to Ecommerce</p>

              <h1>Find Amazing products Below</h1>

              <a href="#container">
                <button>
                  Scroll
                </button>
              </a>
            </div>


            <div className="homeHeading">
              Featured Products
              <div></div>
            </div>

            <div className="container" id="container">
              {
                products && products.map((item, i)=>(
                  <ProductCard product={item} key={i}/>

                ))
              }
            </div> 
          </>
        )
      }
    </>
  )
}
