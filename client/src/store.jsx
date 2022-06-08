import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./Reducers/productReducer";
import { userReducer , profileReducer, forgotPasswordReducer} from "./Reducers/userReducer";
import { cartReducer } from "./Reducers/cartReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
});

let initialState = {

    // this step says if data is present in localstorage then use it
    // else call reducer { only for cart }
    cart: {
        cartItems : localStorage.getItem("cart") ?
                    JSON.parse(localStorage.getItem("cart"))
                    : []
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

