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
    Logout_Fail,
    Update_Profile_Request,
    Update_Profile_Success,
    Update_Profile_Fail,
    Update_Password_Request,
    Update_Password_Success,
    Update_Password_Fail,
    Forgot_Password_Request,
    Forgot_Password_Success,
    Forgot_Password_Fail,
    Reset_Password_Request,
    Reset_Password_Success,
    Reset_Password_Fail
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


// updateProfile part
export const updateProfile =  (userData) => async (dispatch) => {
    try {
        dispatch({
            type: Update_Profile_Request
        });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const {data} = await axios.put(
            '/api/vi/me/update',
            userData,
            config
        );

        dispatch({
            type: Update_Profile_Success,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: Update_Profile_Fail,
            payload: error.responce.data.message
        })
    }
}


// updatePassword part
export const updatePassword =  (password) => async (dispatch) => {
    try {
        dispatch({
            type: Update_Password_Request
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.put(
            '/api/vi/pass/update',
            password,
            config
        );

        dispatch({
            type: Update_Password_Success,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: Update_Password_Fail,
            payload: error.responce.data.message
        })
    }
}

// login part
export const forgotPassword =  (email) => async (dispatch) => {
    try {
        dispatch({
            type: Forgot_Password_Request
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data}= await axios.post(
            '/api/vi/pass/forgot',
            {email},
            config
        );
        
        dispatch({
            type: Forgot_Password_Success,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Forgot_Password_Fail,
            payload: error.response.data.message 
        })
    }
};



// Reset Password
export const resetPassword =  (token , password) => async (dispatch) => {
    try {
        dispatch({
            type: Reset_Password_Request
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data}= await axios.put(
            `/api/vi/pass/reset/${token}`,
            {password},
            config
        );
        
        dispatch({
            type: Reset_Password_Success,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: Reset_Password_Fail,
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