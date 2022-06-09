import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './component/Home/Home';
import ErrPage from "./component/ErrPage/ErrPage.jsx"
import ProductDetails from "./component/ProductDetails/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx"
import Search from "./component/Product/Search.jsx"
import Login from './component/User/Login';
import Signup from './component/User/Signup';
import Account from './component/Account/Account' ;
import UserOptions from './component/layout/Options/UserOptions';
import UpdateProfile  from './component/User/UpdateProfile.jsx';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import OrderMe from './component/OrdersMe/OrderMe';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from "./component/Shipping/Shipping.jsx";
import OrderConfirm from './component/Shipping/OrderConfirm';
import ProcessPayment from './component/Shipping/ProcessPayment';
// import AppPaymentElement from './component/Shipping/AppPaymentElement';

import store from "./store";
import { useEffect, useState } from 'react';
import { loadUser} from './Actions/userAction';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"

import './App.css';

function App() {

    const [stripKey , setStripKey] = useState("");
    const {isAuthenticated, user} = useSelector(state => state.user);

    async function getStripKey(){
      const {data} = await axios.get("/api/vi/stripApiKey");

      setStripKey(data.stripApiKey);
    }
    
    useEffect(()=>{
      store.dispatch(loadUser ());  // call dispatch without using useDispatch

      // call server to send stripe api key
      getStripKey()
    } ,[]);

    
  return (
    <div className="App">

        <Router>

            {isAuthenticated && <UserOptions user={user}/> }
            <Elements stripe={loadStripe(stripKey)}>

          <Routes>


            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/product/:id" element={<ProductDetails/>}/>
            <Route exact path="/products" element={<Products/>}/>
            <Route path="/products/:keyword" element={<Products/>}/>
            <Route exact path="/search" element={<Search/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/password/forgot" element={<ForgotPassword user={user}/>}/>
            <Route exact path="/reset/:token" element={<ResetPassword/>}/>
            <Route exact path="/cart" element={<Cart/>}/>


            {isAuthenticated && 
                <Route exact path="/me/update" element={<UpdateProfile user={user}/>}/>
             }
            {isAuthenticated && 
                <Route exact path="/account" element={<Account user={user}/>}/>
             }
            {isAuthenticated && 
                <Route exact path="/password/update" element={<UpdatePassword user={user}/>}/>
             }
            {isAuthenticated && 
                <Route exact path="/orders/me" element={<OrderMe user={user}/>}/>
             }
            {isAuthenticated && 
                <Route exact path="/login/shipping" element={<Shipping user={user}/>}/>
             }
            {isAuthenticated && 
                <Route exact path="/order/confirm" element={<OrderConfirm user={user}/>}/>
             }

            {
              stripKey && (
                <>
                  {isAuthenticated && 
                    <Route exact path="/payment" element={<ProcessPayment/>}/>
                  }
                </>
              )
            }

            <Route  path="*" element={<ErrPage/>}/>
          </Routes>
          </Elements>

        </Router>

    </div>
  );
}

export default App;
