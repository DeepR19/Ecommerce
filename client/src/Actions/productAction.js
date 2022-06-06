import axios from "axios";

import {
    All_Product_Success,
    All_Product_Request,
    All_Product_Fail,

    Product_Details_Fail,
    Product_Details_Request,
    Product_Details_Success,

    Clear_Err
} from "../Constants/productConstant";


export const getProduct = (keyword="", currentPage=1, price=[0, 3000] , category , rating=0 ) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: All_Product_Request
        });
        let link = `/api/vi/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`

        if(category){
            link = `/api/vi/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`
        }

        const {data} = await axios.get(link);

        dispatch({
            type: All_Product_Success,
            payload: data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type: All_Product_Fail,
            payload: err.response.data.message 
        })
    }
};


export const getProductDetails = (id) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: Product_Details_Request
        });

        const {data} = await axios.get(`/api/vi/product/${id}`);

        dispatch({
            type: Product_Details_Success,
            payload: data
        })
    }catch(err){
        dispatch({
            type: Product_Details_Fail,
            payload: err.response.data.message 
        })
    }
};


// user to clear the errors
export const clearErr = () => async (dispatch)=>{
    dispatch({
        type: Clear_Err
    })
}