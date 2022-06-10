import React from 'react'
import SideBar from "./SideBar";
import {Link} from "react-router-dom";
import {Doughnut, Line} from "react-chartjs-2";

import "./DashBoard.scss";

export default function DashBoard() {

    const lineChart = {
        lables: ["initial Amount", "Amount Earned"],
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
                data: [2,10]   
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
                            <Link to="/admin/paroducts">
                                <p>Product</p>
                                <p>50</p>
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
                        <Line data={lineChart}/>
                    </div>
                    
                    
                    <div className="doughnnutChart">
                        <Doughnut data={daoghnutState}/>
                    </div>

                </div>
            </div>
        </>
    )
}
