import {
    All_Product_Success,
    All_Product_Request,
    All_Product_Fail,
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
                    productsCount : action.payload.productsCount
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
