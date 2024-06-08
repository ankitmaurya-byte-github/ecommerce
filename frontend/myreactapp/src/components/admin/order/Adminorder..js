import React, { useEffect } from "react";
import './adminorder.scss'
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../../../store/action/orderAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../../home/MetaData";
import { Link } from "react-router-dom";
import { Sidebar } from "../dashboard/sidebar/Sidebar";
const Adminorder = () => {
 const dispatch = useDispatch()
 const { data } = useSelector(state => state.adminOrders)
 useEffect(() => {
  dispatch(getAdminOrders())
 }, []);
 const column = [
  { field: "id", headerName: "Order ID", flex: 0.3 },
  {
   field: "status",
   headerName: "Status",
   flex: 0.2,
  },
  {
   field: "orderQuantity",
   headerName: "Item quantity",

   flex: 0.15,
  },
  {
   field: "Amount",
   headerName: " Amount",

   flex: 0.15,
  },
  {
   field: "action",
   headerName: "Action",

   flex: 0.2,
   sortable: false,
   renderCell: (params) => (
    <Link to={`/order/${params.id}`}>
     View Order <LaunchIcon />
    </Link>
   ),
  },
 ];


 const rows = [];

 data &&
  data.forEach((element) => {
   rows.push({
    id: element._id,
    status: element.orderStatus,
    orderQuantity: element.orderItem.length,
    Amount: element.totalPrice,
   });
  });
 return <div className="adminOrders">
  <MetaData title={"admin Orders"} />
  <div>
   <Sidebar />
  </div>
  <div className="maincontent">
   <DataGrid columns={column} rows={rows} className="abchdf" /></div>;
 </div>
};

export default Adminorder;
