import {
    All_Order_Success,
    All_Order_Request,
    All_Order_Fail,
    Clear_Err,
    Create_Order_Fail,
    Create_Order_Request,
    Create_Order_Success,
    My_Order_Fail,
    My_Order_Request,
    My_Order_Success,
    Order_Details_Fail,
    Order_Details_Request,
    Order_Details_Success,
    Update_Order_Request,
    Update_Order_Success,
    Update_Order_Fail,
    Update_Order_Reset,
    Delete_Order_Fail,
    Delete_Order_Success,
    Delete_Order_Reset
} from "../Constants/orderConstant";
import { Delete_Product_Request } from "../Constants/productConstant";

export const newOrderReducer = (state= {}, action)=>{
    switch (action.type){
        case Create_Order_Request: 
            return{
                ...state,
                loading: true
            }
        case Create_Order_Success:
            return{
                loading: false,
                order: action.payload
            }
        case Create_Order_Fail:
            return{
                loading: false,
                error : action.payload
            }
        case Clear_Err:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
};


// update order
export const OrderReducer = (state= {order: []}, action)=>{
    switch (action.type){
        case Update_Order_Request: 
        case Delete_Product_Request:
            return{
                ...state,
                loading: true
            }
        case Update_Order_Success:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case Delete_Order_Success:
            return{
                ...state,
                loading: false,
                idDeleted: action.payload
            }
        case Update_Order_Fail:
        case Delete_Order_Fail:
            return{
                ...state,
                loading: false,
                error : action.payload
            }
        case Update_Order_Reset:
            return{
                ...state,
                isUpdated: false
            }
        case Delete_Order_Reset:
            return{
                ...state,
                isDeleted: false
            }
        case Clear_Err:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
};


// AllOrder Reducer -- Admin
export const allOrderReducer = (state= {order: []}, action)=>{
    switch (action.type){
        case All_Order_Request: 
            return{
                loading: true
            }
        case All_Order_Success:
            return{
                loading: false,
                order: action.payload
            }
        case All_Order_Fail:
            return{
                loading: false,
                error : action.payload
            }
        case Clear_Err:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
};


// myOrderReducer
export const myOrderReducer = (state= {order: []}, action)=>{
    switch (action.type){
        case My_Order_Request: 
            return{
                loading: true
            }
        case My_Order_Success:
            return{
                loading: false,
                order: action.payload
            }
        case My_Order_Fail:
            return{
                loading: false,
                error : action.payload
            }
        case Clear_Err:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
};


// Order Details Reducer
export const orderDetailsReducer = (state= {order: []}, action)=>{
    switch (action.type){
        case Order_Details_Request: 
            return{
                loading: true
            }
        case Order_Details_Success:
            return{
                loading: false,
                order: action.payload
            }
        case Order_Details_Fail:
            return{
                loading: false,
                error : action.payload
            }
        case Clear_Err:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
};





