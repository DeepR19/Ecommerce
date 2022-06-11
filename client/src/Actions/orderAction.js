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
    Order_Details_Fail,
    All_Order_Request,
    All_Order_Success,
    All_Order_Fail,
    Update_Order_Request,
    Update_Order_Success,
    Update_Order_Fail,
    Delete_Order_Request,
    Delete_Order_Success,
    Delete_Order_Fail
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


// update Order -- Admin

export const updateOrder = (id, order) => async (dispatch)=>{
    try{
        dispatch({
            type: Update_Order_Request
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data}  = await axios.put(
            `/api/vi/admin/order/${id}`,
            order,
            config
        );
        dispatch({
            type: Update_Order_Success,
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: Update_Order_Fail,
            payload : error.response.data.message
        })
    }
};


// delete Order -- Admin
export const deleteOrder = (id, order) => async (dispatch)=>{
    try{
        dispatch({
            type: Delete_Order_Request
        });


        const {data}  = await axios.delete(
            `/api/vi/admin/order/${id}`,
        );
        dispatch({
            type: Delete_Order_Success,
            payload: data.success
        })
    }catch(error){
        dispatch({
            type: Delete_Order_Fail ,
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
export const getAllOrders = () => async (dispatch)=>{
    try{
        dispatch({
            type: All_Order_Request
        });


        const {data}  = await axios.get(
            "/api/vi/admin/orders",
        );
        dispatch({
            type: All_Order_Success,
            payload: data.orders
        })
    }catch(error){
        dispatch({
            type: All_Order_Fail,
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