import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../MetaData";
import { userOrderAction } from "../../../store/action/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

const UserOrders = () => {
 const columns = [
  { field: "id", headerName: "ID", flex: 0.3 },
  {
   field: "status",
   headerName: "Status",
   flex: 0.2,
  },
  {
   field: "orderQuantity",
   headerName: "Order quantity",

   flex: 0.15,
  },
  {
   field: "totalAmount",
   headerName: "Total Amount",

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

 const dispatch = useDispatch();
 const { orders: userOrder } = useSelector((state) => state.userOrders);
 console.log(userOrder);
 userOrder &&
  userOrder.forEach((order) => {
   rows.push({
    id: order._id,
    status: order.orderStatus,
    orderQuantity: order.orderItem.length,
    totalAmount: order.totalPrice,
   });
  });
 console.log(userOrder);
 useEffect(() => {
  dispatch(userOrderAction());
 }, []);

 return (
  <>
   <MetaData title={"User Orders"} />
   <div>My Orders</div>
   <div
    style={{
     height: "100vh",
     width: "100%",
     padding: "0 10vw",
     boxSizing: "border-box",
    }}
   >
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={5}
     className="admindataGrid"
     rowsPerPageOptions={[5]}
    />
   </div>
  </>
 );
};

export default UserOrders;
