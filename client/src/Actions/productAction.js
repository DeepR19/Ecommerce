import axios from "axios";

import {
    All_Product_Success,
    All_Product_Request,
    All_Product_Fail,
    Clear_Err
} from "../Constants/productConstant";


export const getProduct = () => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: All_Product_Request
        });

        const {data} = await axios.get("/api/vi/products");

        dispatch({
            type: All_Product_Success,
            payload: data
        })
    }catch(err){
        dispatch({
            type: All_Product_Fail,
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