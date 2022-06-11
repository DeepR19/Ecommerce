import { All_Order_Success, Delete_Order_Request } from "../Constants/orderConstant";
import {
    Login_Request,
    Login_Success,
    Login_Fail,
    Clear_Err,
    Register_User_Request,
    Register_User_Success,
    Register_User_Fail,
    load_User_Fail,
    load_User_Request,
    load_User_Success,
    Logout_Success,
    Logout_Fail,
    Update_Profile_Request,
    Update_Profile_Success,
    Update_Profile_Fail,
    Update_Profile_Reset,
    Update_Password_Request,
    Update_Password_Success,
    Update_Password_Fail,
    Update_Password_Reset,
    Forgot_Password_Request,
    Forgot_Password_Success,
    Forgot_Password_Fail,
    Reset_Password_Request,
    Reset_Password_Fail,
    Reset_Password_Success,
    All_Users_Request,
    All_Users_Fail,
    Users_Details_Request,
    Users_Details_Success,
    Users_Details_Fail,
    Update_Users_Request,
    Update_Users_Success,
    Delete_Users_Request,
    Update_Users_Fail,
    Delete_Users_Fail,
    Update_Users_Reset,
    Delete_Users_Reset,
    Delete_Users_Success,
    All_Users_Success
} from "../Constants/userConstant";

export const userReducer =  (state = {user: {} }, action ) =>{
    switch (action.type){
        case Login_Request:
        case Register_User_Request:
        case load_User_Request:
            return {
                loading : true,
                isAuthenticated: false
            }
        case Login_Success:
        case Register_User_Success:
        case load_User_Success:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                
            }
        case Login_Fail:
        case Register_User_Fail:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,
            }
        case Logout_Fail:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case Logout_Success:
            return{
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case load_User_Fail:
                return{
                    loading: false,
                    isAuthenticated: false,
                    error: action.payload,
                    user: null,
                }
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state
    }
};


// update profile data
export const profileReducer =  (state = {profile: {} }, action ) =>{
    switch (action.type){
        case Update_Profile_Request:
        case Update_Password_Request:
        case Update_Users_Request:
        case Delete_Users_Request:
            return {
                loading : true,
                ...state
            }
        case Update_Profile_Success:
        case Update_Password_Success:
        case Update_Users_Success:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload,
                
            }
        case Delete_Users_Success:
            return{
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
                
            }
        case Update_Profile_Fail:
        case Update_Password_Fail:
        case Update_Users_Fail:
        case Delete_Users_Fail:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case Update_Profile_Reset:
        case Update_Password_Reset:
        case Update_Users_Reset:
            return{
                ...state,
                isUpdated: false
            }
        case Delete_Users_Reset:
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
            return state
    }
};


//  profile data
export const allUsersReducer =  (state = {users: {} }, action ) =>{
    switch (action.type){
        case All_Users_Request:
            return {
                loading : true,
                ...state
            }
        case All_Users_Success:
            return{
                ...state,
                loading: false,
                users: action.payload,
                
            }
        case All_Users_Fail:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        
        
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state
    }
};

// update profile data
export const userDetailsReducer =  (state = {users: {} }, action ) =>{
    switch (action.type){
        case Users_Details_Request:
            return {
                loading : true,
                ...state
            }
        case Users_Details_Success:
            return{
                ...state,
                loading: false,
                user: action.payload,
                
            }
        case Users_Details_Fail:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        
        
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state
    }
};


// update profile data
export const forgotPasswordReducer =  (state = {profile: {} }, action ) =>{
    switch (action.type){
        case Forgot_Password_Request:
        case Reset_Password_Request:
            return {
                loading : true,
                ...state
            }
        case Forgot_Password_Success:
            return{
                ...state,
                loading: false,
                message: action.payload,
                
            }
        case Reset_Password_Success:
            return{
                ...state,
                loading: false,
                success: action.payload,
                
            }
        case Forgot_Password_Fail:
        case Reset_Password_Fail:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        
        
        case Clear_Err:
            return {
                ...state,
                error : null
            }
        
        default:
            return state
    }
};

