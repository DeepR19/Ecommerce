import React, { useEffect , useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {getProductDetails, newReview} from "../../Actions/productAction";
import Carousel from "react-material-ui-carousel"
import ReviewCard from "./ReviewCard.jsx"
import Loading from '../layout/Loading/Loading';
import { useParams } from 'react-router-dom';
import Additional from "../layout/Additional";
import { addItemToCart } from '../../Actions/cartAction';

import {
    Dialog, 
    DialogContent,
    DialogTitle,
    DialogActions,
    Button
} from "@material-ui/core";

import {Rating} from "@material-ui/lab";
import { New_Review_Reset } from '../../Constants/productConstant';
import "./ProductDetails.scss"

export default function ProductDetails({match}) {
    let {id} = useParams();

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment,  setComment] = useState("");

    const submitReviewToggle = ()=>{
        open ? setOpen(false) : setOpen(true)
    };

    const reviewSubmitHandler = ()=>{
        const data = {
            "rating": rating,
            "comment": comment,
            "productId": id
        };

        dispatch(newReview(data));

        setOpen(false);
    };

    const {success} = useSelector(state => state.newReview)
    
    const {product, loading, error} = useSelector(state => state.productDetails)
    useEffect(()=>{
        // if(error){
        //     alert.error(error);
        //     dispatch(clearErr());
        // }
        if(success){
            dispatch({type: New_Review_Reset})
        }

        dispatch(getProductDetails(id))
    },[dispatch, id, success, comment])
   

    // increase quantity
    const increaseQuantity =()=>{

        if(quantity >= product.Stock){
            setQuantity(quantity)
        }else{
            setQuantity(quantity +1)
        }
    };

    // decrease quantity
    const decreaseQuantity =()=>{
        if(quantity < 2){
            setQuantity(quantity)
        }else{
            setQuantity(quantity -1)
        }
    };

    // we call reducer of add cart items { with id and quantity }
    const addToCartHandler =()=>{
        dispatch(addItemToCart(id, quantity))
    }

    // style of the rating stars
    const options = {
        size: "large",
        value: product ? (product.ratings) : 0,
        readOnly: true,
        precision: 0.5
      }
  return (
        <>
        {loading? <Loading/>:
            (product && !loading) ?
        <>
            <Additional title={`DeepR19 | Product Details`}/>

            <div className="ProductDetails">
            <div className='PDIMG'>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className='PD2'>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle className="diaHead">Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => {setRating(e.target.value)}}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <div className="revCont">

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          </div>

            </>
            :<Loading/>
        
        }
        </>
    )
}
