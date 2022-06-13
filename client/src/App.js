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
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from "./component/Shipping/Shipping.jsx";
import OrderConfirm from './component/Shipping/OrderConfirm';
import ProcessPayment from './component/Shipping/ProcessPayment';
import OrderSuccess from './component/Shipping/OrderSuccess';
import MyOrder from "./component/Shipping/MyOrder";
import OrderDetails from './component/OrderDetails/OrderDetails';

import Dashboard from './component/Admin/DashBoard/DashBoard';
import AdminProducts from './component/Admin/AllProducts/AdminProducts';
import NewProduct from './component/Admin/NewProd/NewProduct';
import UpdateProduct from "./component/Admin/Update/UpdateProduct"
import AdminOrder from './component/Admin/Orders/AdminOrder';
import ProcessOrder from './component/Admin/Orders/ProcessOrder';
import UsersList from './component/Admin/AllUsers/UsersList';

import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer"

import store from "./store";
import { useEffect, useState } from 'react';
import { loadUser} from './Actions/userAction';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"

import './App.css';
import UpdateUser from './component/Admin/AllUsers/UpdateUser';
import ProdReviews from './component/Admin/Reviews/ProdReviews';
import Contact from './component/Contact/Contact';
import About from './component/About/About';

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
        <Header/>

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
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/contact" element={<Contact/>}/>


            <Route exact path="/me/update" element={ isAuthenticated === false? <Login/> : <UpdateProfile user={user}/>}/>
            <Route exact path="/account" element={ isAuthenticated === false? <Login/> : <Account user={user}/>}/>
            <Route exact path="/password/update" element={ isAuthenticated === false? <Login/> : <UpdatePassword user={user}/>}/>
            <Route exact path="/login/shipping" element={ isAuthenticated === false? <Login/> : <Shipping user={user}/>}/>
            <Route exact path="/order/confirm" element={ isAuthenticated === false? <Login/> : <OrderConfirm user={user}/>}/>
            <Route exact path="/success" element={ isAuthenticated === false? <Login/> : <OrderSuccess/>}/>
            <Route exact path="/orders" element={ isAuthenticated === false? <Login/> : <MyOrder/>}/>
            <Route exact path="/order/:id" element={ isAuthenticated === false? <Login/> : <OrderDetails/>}/>
            
            <Route exact path="/admin/dashboard" element={ isAuthenticated === false? <Login/> : <Dashboard/>}/>
            <Route exact path="/admin/products" element={ isAuthenticated === false? <Login/> : <AdminProducts/>}/>
            <Route exact path="/admin/product/" element={ isAuthenticated === false? <Login/> : <NewProduct/>}/>
            <Route exact path="/admin/product/:id" element={ isAuthenticated === false? <Login/> : <UpdateProduct/>}/>
            <Route exact path="/admin/orders" element={ isAuthenticated === false? <Login/> : <AdminOrder/>}/>
            <Route exact path="/admin/order/:id" element={ isAuthenticated === false? <Login/> : <ProcessOrder/>}/>
            <Route exact path="/admin/users" element={ isAuthenticated === false? <Login/> : <UsersList/>}/>
            <Route exact path="/admin/user/:id" element={ isAuthenticated === false? <Login/> : <UpdateUser/>}/>
            <Route exact path="/admin/reviews" element={ isAuthenticated === false? <Login/> : <ProdReviews/>}/>

            {
              stripKey && (
                <>
                    <Route exact path="/payment" element={ isAuthenticated === false? <Login/> : <ProcessPayment/>}/>
                </>
              )
            }

            <Route  path="*" element={<ErrPage/>}/>
          </Routes>
          </Elements>


          <Footer/>
        </Router>

    </div>
  );
}

export default App;
