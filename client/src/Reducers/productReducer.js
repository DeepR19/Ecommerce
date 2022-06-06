import {
    All_Product_Success,
    All_Product_Request,
    All_Product_Fail,

    Product_Details_Fail,
    Product_Details_Request,
    Product_Details_Success,
    
    Clear_Err
} from "../Constants/productConstant";


export const productReducer =( state={ products: [] } , action)=>{

        switch (action.type){
            
            case All_Product_Request:  //  this is used when req is send to server
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
            case All_Product_Fail:
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
