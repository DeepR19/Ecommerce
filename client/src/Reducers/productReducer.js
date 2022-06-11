import {
    All_Product_Success,
    All_Product_Request,
    All_Product_Fail,

    Product_Details_Fail,
    Product_Details_Request,
    Product_Details_Success,
    
    Clear_Err,
    New_Review_Request,
    New_Review_Success,
    New_Review_Fail,
    New_Review_Reset,
    Admin_Product_Success,
    Admin_Product_Request,
    Admin_Product_Fail,
    New_Product_Request,
    New_Product_Success,
    New_Product_Fail,
    New_Product_Reset,
    Delete_Product_Request,
    Delete_Product_Success,
    Delete_Product_Fail,
    Delete_Product_Reset,
    Update_Product_Request,
    Update_Product_Fail,
    Update_Product_Success,
    Update_Product_Reset,
    All_Review_Request,
    All_Review_Success,
    All_Review_Fail,
    Delete_Review_Request,
    Delete_Review_Success,
    Delete_Review_Fail,
    Delete_Review_Reset
} from "../Constants/productConstant";

// All products
export const productsReducer =( state={ products: [] } , action)=>{

        switch (action.type){
            
            case All_Product_Request:  //  this is used when req is send to server
            case Admin_Product_Request:
                return {
                    loading: true,
                    product : []
                }
            case All_Product_Success:       //this is working when res is come from server
                return {
                    loading: false,
                    products : action.payload.prod,         // this products is pass when useSelector is called
                    productsCount : action.payload.productsCount,
                    resuluPerPage: action.payload.resuluPerPage,
                    filteredProductsCount : action.payload.filteredProductsCount
                }
            case Admin_Product_Success:
                return{
                    loading: false,
                    products: action.payload
                }
            case All_Product_Fail:
            case Admin_Product_Fail:
                return {
                    loading: false,
                    error : action.payload
                }
            case Clear_Err:
                return {
                    ...state,
                    error : null
                }
            
            default:
                return state;                
        }
    };


export const productDetailsReducer =( state={ products: {} } , action)=>{

    switch (action.type){

        case Product_Details_Request:  //  this is used when req is send to server
            return {
                loading: true,
                ...state
            }
        case Product_Details_Success:       //this is working when res is come from server
            return {
                loading: false,
                product : action.payload.product,
                productsCount: action.payload.productCount,
            }
        case Product_Details_Fail:
            return {
                loading: false,
                error : action.payload
            }
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state;                
    }
};

export const productReviewReducer =( state={ products: {} } , action)=>{

    switch (action.type){

        case All_Review_Request:  //  this is used when req is send to server
            return {
                loading: true,
                ...state
            }
        case All_Review_Success:       //this is working when res is come from server
            return {
                loading: false,
                reviews : action.payload,
            }
        case All_Review_Fail:
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state;                
    }
};


export const reviewReducer =( state={ products: {} } , action)=>{

    switch (action.type){

        case Delete_Review_Request:  //  this is used when req is send to server
            return {
                loading: true,
                ...state
            }
        case Delete_Review_Success:       //this is working when res is come from server
            return {
                loading: false,
                isDeleted : action.payload,
            }
        case Delete_Review_Fail:
            return {
                ...state,
                loading: false,
                error : action.payload
            }

        case Delete_Review_Reset:
            return{
                ...state,
                isDeleted: false
            }
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state;                
    }
};


export const newReviewReducer =( state={ products: {} } , action)=>{

    switch (action.type){

        case New_Review_Request:  //  this is used when req is send to server
            return {
                loading: true,
                ...state
            }
        case New_Review_Success:       //this is working when res is come from server
            return {
                loading: false,
                success : action.payload,
            }
        case New_Review_Fail:
            return {
                ...state,
                loading: false,
                error : action.payload
            }

        case New_Review_Reset:
            return{
                ...state,
                success: false
            }
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state;                
    }
};


// new product
export const productReducer =( state={} , action)=>{

    switch (action.type){

        case Delete_Product_Request:  //  this is used when req is send to server
        case Update_Product_Request:
            return {
                loading: true,
                ...state
            }
        case Delete_Product_Success:       //this is working when res is come from server
            return {
                ...state,
                loading: false,
                isDeleted : action.payload
            }
        case Update_Product_Success:       //this is working when res is come from server
            return {
                ...state,
                loading: false,
                isUpdated : action.payload
            }
        case Delete_Product_Fail:
        case Update_Product_Fail:
            return {
                ...state,
                loading: false,
                error : action.payload
            }

        case Delete_Product_Reset:
            return{
                ...state,
                isDeleted: false
            }
        case Update_Product_Reset:
            return{
                ...state,
                isUpdated: false
            }
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state;                
    }
};


// new product
export const newProductReducer =( state={ products: {} } , action)=>{

    switch (action.type){

        case New_Product_Request:  //  this is used when req is send to server
            return {
                loading: true,
                ...state
            }
        case New_Product_Success:       //this is working when res is come from server
            return {
                loading: false,
                success : action.payload.success,
                product: action.payload.product
            }
        case New_Product_Fail:
            return {
                ...state,
                loading: false,
                error : action.payload
            }

        case New_Product_Reset:
            return{
                ...state,
                success: false
            }
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state;                
    }
};


