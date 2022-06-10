import {
    Clear_Err,
    Create_Order_Fail,
    Create_Order_Request,
    Create_Order_Success,
    My_Order_Fail,
    My_Order_Request,
    My_Order_Success,
    Order_Details_Fail,
    Order_Details_Request,
    Order_Details_Success
} from "../Constants/orderConstant";

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


