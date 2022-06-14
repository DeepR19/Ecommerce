import React ,{useState}from 'react'
import {useNavigate} from "react-router-dom";
import Additional from '../layout/Additional';
import { Link } from 'react-router-dom';

import "./Search.scss";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const history= useNavigate();

    const searchHandler = (e)=>{
        e.preventDefault();

        if(keyword.trim()){
            history(`/products/${keyword}`);
        }else{
            history("/products");
        }
    }
  return (
        <>
            <Additional title="Search a product"/>

            
            <form className="searchBox" onSubmit={searchHandler}>
                <input type="text"
                placeholder='Search a Product...'
                onChange={(e) => setKeyword(e.target.value)} />

                <button type="submit" className='Syb'>Submit</button>
            </form>
        </>
    )
}
