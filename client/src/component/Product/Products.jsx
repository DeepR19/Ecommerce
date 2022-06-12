import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getProduct, clearErr} from "../../Actions/productAction";
import ProductCard from '../Home/ProductCard';
import Loader from "../layout/Loading/Loading";

import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import Additional from "../layout/Additional"
import "./Product.scss"



const categories =[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smart Phone"
]



export default function Products({match}) {

    const [currentPage, setCurrentPage] = useState(1)
    const [price , setPrice] = useState([0, 900000])
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState(0)

    const {keyword} = useParams();
    const dispatch = useDispatch();

    const {products, loading, error, productsCount, resuluPerPage ,filteredProductsCount} = useSelector(state => state.products)

    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
        
    }

    const priceHandler = (e, newPrice)=>{
        setPrice(newPrice)
    }

    useEffect(()=>{
        dispatch(getProduct(keyword, currentPage, price,category, rating))
    },[dispatch ,keyword,currentPage, price,category, rating])


    // length of product after query
    const count = filteredProductsCount;


  return (
    <>
        {
            loading ? <Loader/> : 
            <>
            
            <Additional title={`DeepR19 | Products`}/>

                <div className="productsHeading">Products</div>

                <div className="products">
                    {
                        products && products.map(product =>(
                            <ProductCard key={product._id} product={product}/>
                        ))
                    }
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>

                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={30000}
                    ></Slider>


                    <Typography>Categories</Typography>

                    <ul>
                        {
                            categories.map(opt=>(
                                <li className="category-link"
                                onClick={()=>{setCategory(opt)}}>
                                    {opt}
                                </li>
                            ))
                        }
                    </ul>


                    <fieldset>
                        <Typography component="legend">Rating Above</Typography>
                        
                        <Slider
                            value={rating}
                            onChange={(e, newRating)=>{
                                setRating(newRating)
                            }}
                            aria-labelledby= "continuous-slider"
                            valueLabelDisplay='auto'
                            min={0}
                            max={5}
                        ></Slider>
                    </fieldset>
                </div>

                {(resuluPerPage < count) && 
                    <div className="paginationBox">
                        <Pagination 
                            activePage = {currentPage}
                            itemsCountPerPage = {resuluPerPage}
                            totalItemsCount = {productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText= "Next"
                            prevPageText = "Prev"
                            firstPageText = "1st"
                            lastPageText = "last"
                            itemClass = "page-items"
                            linkClass = "page-link"
                            activeClass = "pageItemActive"
                            activeLinkClass='pageLinkActive' />
                </div>
                }
            </>
        }
    </>
  )
}
