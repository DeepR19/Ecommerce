import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import ErrPage from "./component/ErrPage/ErrPage.jsx"
import ProductDetails from "./component/ProductDetails/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx"
import Search from "./component/Product/Search.jsx"
import Login from './component/User/Login';
import Signup from './component/User/Signup';
import Account from './component/Account/Account' ;
import './App.css';

function App() {
  return (
    <div className="App">

        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/product/:id" element={<ProductDetails/>}/>
            <Route exact path="/products" element={<Products/>}/>
            <Route path="/products/:keyword" element={<Products/>}/>
            <Route exact path="/search" element={<Search/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/account" element={<Account/>}/>

            <Route  path="*" element={<ErrPage/>}/>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
