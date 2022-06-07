import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {getProductDetails} from "../../Actions/productAction";
import ReactStars from 'react-rating-stars-component';
import Carousel from "react-material-ui-carousel"
import ReviewCard from "./ReviewCard.jsx"
import Loading from '../layout/Loading/Loading';
import { useParams } from 'react-router-dom';
import Additional from "../layout/Additional"

// import {useAlert} from "react-alert";

// npm i react-material-ui-carousel
// @material-ui/core
// @material-ui/icons
// import Carousel from "react-..."


export default function ProductDetails({match}) {
    let {id} = useParams();
    const dispatch = useDispatch();
    // const alert = useAlert();
    
    const {product, loading, error} = useSelector(state => state.productDetails)

    useEffect(()=>{
        // if(error){
        //     alert.error(error);
        //     dispatch(clearErr());
        // }
        console.log(id)
            dispatch(getProductDetails(id))
    },[dispatch, id])
   


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product ? (product.rating) : 0,
        isHalf: true
      }
  return (
        <>
        {loading? <Loading/>:
            (product && !loading) ?
        <>
            <Additional title={`DeepR19 | Product Details`}/>

            <div className="productDetails">
                <div>
                    <Carousel>
                        {
                            product.images &&
                            product.images.map((item, i)=>(
                                <img
                                    className='carouselImage'
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} slide`}
                                />
                            ))
                        }
                    </Carousel>
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>

                    <div className="detailsBlock-2">
                        <ReactStars {...options}/>
                        <span>({product.numOfReview}) Reviews</span>
                    </div>

                    <div className="detailsBlock-3">
                        <h1>{`Rs ${product.price}`}</h1>

                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input type="number" name="quantity" />
                                <button>+</button>
                            </div>

                            <button>Add To Cart</button>
                        </div>
                        
                        <p>
                            Status: {" "}
                            <b className={product.Stock < 1 ? "redColor": "greenColor"}>
                                {product.Stock< 1? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>

                    <button className="submitReview">
                        Submit Review
                    </button>
                </div>
            </div>


            
            <h3 className="reviewsHeading">Reviews</h3>

            {product.reviews && product.reviews[0] ? 
                product.reviews.map(review=> (<ReviewCard review={review}/>))
            : <p className='noReviews'>No Reviews Yet</p>
            }
            </>
            :<Loading/>
        
        }
        </>
    )
}