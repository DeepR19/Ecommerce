import React , {useEffect} from 'react'
import SideBar from "../SideBar";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getAdminProduct} from "../../../Actions/productAction";
import {Doughnut, Line} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

import "./DashBoard.scss";

export default function DashBoard() {
    Chart.register(...registerables);
  const dispatch = useDispatch()
  const {products} = useSelector(state => state.products);

    let outOfStock = 0;

    products &&
        products.forEach(item =>{
            if(item.Stock === 0){
                outOfStock += 1
            }
        })

        useEffect(()=>{
            dispatch(
              getAdminProduct()
            )
          },[dispatch])


    const lineState = {
        
            labels: ["initial Amount", "Amount Earned"],
            datasets:[
                {
                    label: "Total Amount",
                    backgroundColor: ["tomato"],
                    hoverBackgroundColor : ["red"],
                    data: [0,1000]
                }
            ]
        };


    const daoghnutState = {
        labels: ["OutOfStock", "InStock"],
        datasets:[
            {
                backgroundColor: ["#00A684", "#680084"],
                hoverBackgroundColor: ["#485000", "#35014f"],
                data: [outOfStock , products && (products.length - outOfStock)]   
            }
        ]
    }
  return (
        <>
            <div className="dashboard">
                <SideBar/>

                <div className="dashBoardContainer">
                    <h1>DashBoard</h1>

                    <div className="dashboardSummry">
                        <div>
                            <p>
                                Total Amount <br /> Rs.2000
                            </p>
                        </div>

                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>

                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>4</p>
                            </Link>

                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>2</p>
                            </Link>
                        </div>
                    </div>


                    <div className="lineChart">
                        <Line data={lineState} />
                    </div>
                    
                    
                    <div className="doughnnutChart">
                        <Doughnut data={daoghnutState}/>
                    </div>

                </div>
            </div>
        </>
    )
}
