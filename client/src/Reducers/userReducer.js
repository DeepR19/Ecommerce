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
    Logout_Fail
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
}