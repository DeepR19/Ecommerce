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

import store from "./store";
import { useEffect } from 'react';
import { loadUser, updatePassword } from './Actions/userAction';
import { useSelector } from 'react-redux';

import './App.css';

function App() {
    const {isAuthenticated, user} = useSelector(state => state.user);
  // const location = useLocation();
    useEffect(()=>{
      store.dispatch(loadUser ());  // call dispatch without using useDispatch
    } ,[]);

  return (
    <div className="App">

        <Router>

            {isAuthenticated && <UserOptions user={user}/> }

          <Routes>


            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/product/:id" element={<ProductDetails/>}/>
            <Route exact path="/products" element={<Products/>}/>
            <Route path="/products/:keyword" element={<Products/>}/>
            <Route exact path="/search" element={<Search/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            
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
                <Route exact path="/password/forgot" element={<ForgotPassword user={user}/>}/>

            <Route  path="*" element={<ErrPage/>}/>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
