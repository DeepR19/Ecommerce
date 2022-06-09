import axios  from "axios";
import {
    Create_Order_Request,
    Create_Order_Success,
    Create_Order_Fail,
    My_Order_Request,
    My_Order_Success,
    My_Order_Fail,
    Clear_Err,
    Order_Details_Request,
    Order_Details_Success,
    Order_Details_Fail
} from "../Constants/orderConstant";

// create new orders
export const createOrder = (order) => async (dispatch)=>{
    try{
        dispatch({
            type: Create_Order_Request
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data}  = await axios.post(
            "/api/vi/order/new",
            order,
            config
        );
        dispatch({
            type: Create_Order_Success,
            payload: data
        })
    }catch(error){
        dispatch({
            type: Create_Order_Fail,
            payload : error.response.data.message
        })
    }
};


// see my orders
export const MyOrders = () => async (dispatch)=>{
    try{
        dispatch({
            type: My_Order_Request
        });


        const {data}  = await axios.get(
            "/api/vi/orders/me",
        );
        dispatch({
            type: My_Order_Success,
            payload: data.orders
        })
    }catch(error){
        dispatch({
            type: My_Order_Fail,
            payload : error.response.data.message
        })
    }
};


// see my orders
export const getOrderDetails = (id) => async (dispatch)=>{
    try{
        dispatch({
            type: Order_Details_Request
        });


        const {data}  = await axios.get(
            `/api/vi/order/${id}`,
        );
        dispatch({
            type: Order_Details_Success,
            payload: data.order
        })
    }catch(error){
        dispatch({
            type: Order_Details_Fail,
            payload : error.response.data.message
        })
    }
};


// user to clear the errors
export const clearErr = () => async (dispatch)=>{
    dispatch({
        type: Clear_Err
    })
}