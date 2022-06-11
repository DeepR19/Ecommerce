import axios from "axios";

import {
    All_Product_Success,
    All_Product_Request,
    All_Product_Fail,

    Product_Details_Fail,
    Product_Details_Request,
    Product_Details_Success,

    New_Review_Request,
    New_Review_Fail,
    New_Review_Success,
    
    Clear_Err,
   
    Admin_Product_Fail,
    Admin_Product_Request,
    Admin_Product_Success,
    
    New_Product_Request,
    New_Product_Success,
    New_Product_Fail,

    Delete_Product_Success,
    Delete_Product_Fail,
    Delete_Product_Request,
    Update_Product_Request,
    Update_Product_Success,
    Update_Product_Fail,
    All_Review_Request,
    All_Review_Success,
    All_Review_Fail,
    Delete_Review_Request,
    Delete_Review_Fail,
    Delete_Review_Success,
} from "../Constants/productConstant";


export const getProduct = (keyword="", currentPage=1, price=[0, 900000] , category , rating=0 ) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
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


export const createProduct = (productData) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: New_Product_Request
        });

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.post(
            `/api/vi/admin/product/new`,
            productData,
            config
        );

        dispatch({
            type: New_Product_Success,
            payload: data
        })
    }catch(err){
        dispatch({
            type: New_Product_Fail,
            payload: err.response.data.message 
        })
    }
};

export const updateProduct = (id, productData) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: Update_Product_Request
        });

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.put(
            `/api/vi/admin/product/${id}`,
            productData,
            config
        );

        dispatch({
            type: Update_Product_Success,
            payload: data.success
        })
    }catch(err){
        dispatch({
            type: Update_Product_Fail,
            payload: err.response.data.message 
        })
    }
};

// delete product
export const deleteProduct = (id) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: Delete_Product_Request
        });


        const {data} = await axios.delete(
            `/api/vi/admin/product/${id}`
        );

        dispatch({
            type: Delete_Product_Success,
            payload: data.success
        })
    }catch(err){
        dispatch({
            type: Delete_Product_Fail,
            payload: err.response.data.message 
        })
    }
};


export const newReview = (reviewData) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: New_Review_Request
        });

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.put(
            `/api/vi/prod/review`,
            reviewData,
            config
        );

        dispatch({
            type: New_Review_Success,
            payload: data
        })
    }catch(err){
        dispatch({
            type: New_Review_Fail,
            payload: err.response.data.message 
        })
    }
};

// get all review of prod
export const getAllReviews = (id) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: All_Review_Request
        });

        const {data} = await axios.get(
            `/api/vi/prod/reviews?id=${id}`,
        );

        dispatch({
            type: All_Review_Success,
            payload: data.reviews
        })
    }catch(err){
        dispatch({
            type: All_Review_Fail,
            payload: err.response.data.message 
        })
    }
};

// delete review of prod
export const deleteReviews = (reviewId, productId) => async (dispatch)=>{   // this function res is came from home useEffect to take the data
    try{
        dispatch({
            type: Delete_Review_Request
        });

        const {data} = await axios.delete(
            `/api/vi/prod/reviews?id=${reviewId}&productId=${productId}`,
        );

        dispatch({
            type: Delete_Review_Success,
            payload: data.reviews
        })
    }catch(err){
        dispatch({
            type: Delete_Review_Fail,
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

export const getAdminProduct = (id) => async (dispatch)=>{ 
    try {
        dispatch({
            type: Admin_Product_Request
        });

        const {data} = await axios.get("/api/vi/admin/products");

        dispatch({
            type: Admin_Product_Success,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: Admin_Product_Fail,
            payload: error.response.data.message
        })
    }
}

// user to clear the errors
export const clearErr = () => async (dispatch)=>{
    dispatch({
        type: Clear_Err
    })
}