import { Add_To_Cart, Remove_Cart_Item, Save_Shipping_Info } from "../Constants/cartConstant";
import axios from "axios";

// Add to cart
export const addItemToCart = (id, quantity)=> async (dispatch, getState)=>{
    const {data} = await axios.get(`/api/vi/product/${id}`);

    dispatch({
        type: Add_To_Cart,
        payload: {
            product : data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0],
            stock: data.product.Stock,
            quantity
        }
    });

    // saving data of cart in localstorage
    localStorage.setItem("cart", JSON.stringify( getState().cart.cartItems ))
};


export const RemoveFromCart = (id) => async (dispatch, getState)=>{
    dispatch({
        type: Remove_Cart_Item,
        payload: id
    });

    localStorage.setItem("cart", JSON.stringify( getState().cart.cartItems ))

};



export const saveShippingInfo = (data) => async (dispatch, getState)=>{
    dispatch({
        type: Save_Shipping_Info,
        payload: data
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data))
}