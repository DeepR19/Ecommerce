import {
    Login_Request,
    Login_Success,
    Login_Fail,
    Clear_Err,
    Register_User_Fail,
    Register_User_Request,
    Register_User_Success,
    load_User_Request,
    load_User_Success,
    load_User_Fail,
    Logout_Success,
    Logout_Fail
} from "../Constants/userConstant";

import axios from "axios";


// login part
export const login =  (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: Login_Request
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data}= await axios.post(
            '/api/vi/login',
            {email, password},
            config
        );
        
        dispatch({
            type: Login_Success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Login_Fail,
            payload: error.response.data.message 
        })
    }
};


// register part
export const register =  (userData) => async (dispatch) => {
    try {
        dispatch({
            type: Register_User_Request
        });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const {data} = await axios.post(
            '/api/vi/signup',
            userData,
            config
        );

        dispatch({
            type: Register_User_Success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Register_User_Fail,
            payload: error.responce.data.message
        })
    }

}


// Load user
export const loadUser =  (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: load_User_Request
        });

        const {data}= await axios.get(
            '/api/vi/me',
        );
        
        dispatch({
            type: load_User_Success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: load_User_Fail,
            payload: error.response.data.message 
        })
    }
}


// logout action
export const logout =  () => async (dispatch) => {
    try {
       
        await axios.post(
            '/api/vi/logout',
        );
        
        dispatch({
            type: Logout_Success
        })
    } catch (error) {
        dispatch({
            type: Logout_Fail,
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