import React from 'react';
import { Link } from 'react-router-dom';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashBoardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

import "./sideBar.scss"

export default function SideBar() {
    const handleSide = (e)=>{
        const par = e.target.parentElement;
        par.classList.toggle("active")
    }
  return (
    <>
        <div className="sideBar">
            <div className="sideBarHam" onClick={handleSide}></div>
            <Link to="/">Home</Link>

            <Link to="/admin/dashboard">
                <p>
                    <DashBoardIcon/> DashBoard
                </p>
            </Link>

            <TreeView
            className="trwe"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ImportExportIcon/>}
            >
                <TreeItem nodeId='1' label="Products">
                    <Link to="/admin/products">
                        <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>}></TreeItem>
                    </Link>
                    
                    <Link to="/admin/product">
                        <TreeItem nodeId='3' label="Create" icon={<AddIcon/>}></TreeItem>
                    </Link>
                </TreeItem>
                        
            </TreeView>


            <Link to="/admin/orders">
                <p>
                    <ListAltIcon/>
                    Orders
                </p>
            </Link>

            <Link to="/admin/users">
                <p>
                    <PeopleIcon/>
                    Users
                </p>
            </Link>

            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon/>
                    Reviews
                </p>
            </Link>
        </div>
    </>
  )
}
