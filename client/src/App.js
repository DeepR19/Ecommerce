import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import ErrPage from "./component/ErrPage/ErrPage.jsx"
import ProductDetails from "./component/Product/ProductDetails.jsx";

import './App.css';

function App() {
  return (
    <div className="App">

        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/product/:id" element={<ProductDetails/>}/>

            <Route  path="*" element={<ErrPage/>}/>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
