import React from "react";
import { TreeView, TreeItem, SimpleTreeView } from '@mui/x-tree-view';
import { BiCollapse, BiExpand } from "react-icons/bi";

import './sidebar.scss'
import image from '../../../../images/0nline-trends-2022.png'
import { LuLayoutDashboard } from "react-icons/lu";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { RiUserShared2Fill } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { Link } from "react-router-dom";




export const Sidebar = () => {
 return (
  <div className="sidebar">
   <Link>
    <img src={image} alt="IMAGE" />
   </Link>
   <Link to={'/admin/dashboard'}>
    <p><span><LuLayoutDashboard /></span>Dashboard</p>
   </Link>
   <SimpleTreeView slots={{
    expandIcon: BiCollapse,
    collapseIcon: BiExpand
   }}>
    <TreeItem
     itemId="grid"
     label="Product"
    >
     <Link to={'/admin/products'}>
      <TreeItem itemId="grid-pro" label="All" />
     </Link>
     <Link to={'/admin/create/product'}>
      <TreeItem itemId="grid-community" label="create" />
     </Link>
    </TreeItem>
   </SimpleTreeView>
   <Link to={'/admin/orders'}>
    <p>
     <BiSolidPurchaseTagAlt />
     Orders
    </p>
   </Link>
   <Link to={'/admin/users'}>
    <p>
     <RiUserShared2Fill />
     Users
    </p>
   </Link>
   <Link to={'/admin/reviews'}>
    <p>
     <MdRateReview />
     Reviews
    </p>
   </Link>
  </div>
 );
};
