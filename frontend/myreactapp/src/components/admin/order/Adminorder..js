import React, { useEffect } from "react";
import './adminorder.scss'
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAdminOrders } from "../../../store/action/orderAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../../home/MetaData";
import { Link } from "react-router-dom";
import { Sidebar } from "../dashboard/sidebar/Sidebar";
import { RiDeleteBin5Line } from "react-icons/ri";
const Adminorder = () => {
 const dispatch = useDispatch()
 const { data } = useSelector(state => state.adminOrders)
 const handeldelete = (params) => {
  dispatch(deleteOrder(params.row.id))
 }

 useEffect(() => {
  dispatch(getAdminOrders())
 }, []);
 const column = [
  { field: "id", headerName: "Order ID", flex: 0.25 },
  {
   field: "status",
   headerName: "Status",
   flex: 0.13,
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

   flex: 0.25,
   sortable: false,
   renderCell: (params) => (
    <div div className="action" >
     <Link to={`/order/${params.id}`}>
      View Order <LaunchIcon size={25} />
     </Link>
     <RiDeleteBin5Line className="deletebutton" onClick={() => handeldelete(params)} size={25} />
    </div>
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
  <div style={{ maxWidth: '200px' }}>
   <Sidebar />
  </div>
  <div className="maincontent">
   <DataGrid columns={column} rows={rows} className="abchdf" /></div>;
 </div>
};

export default Adminorder;
