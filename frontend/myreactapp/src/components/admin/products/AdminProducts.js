import React, { useEffect } from "react";
import './adminProducts.scss'
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../../store/action/producAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../../home/MetaData";
import { Link } from "react-router-dom";
import './adminProducts.scss'
import { Sidebar } from "../dashboard/sidebar/Sidebar";
const AdminProducts = () => {
 const dispatch = useDispatch()
 const { data } = useSelector(state => state.adminProducts)
 useEffect(() => {
  dispatch(getAdminProduct())
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
    <Link to={`/product/${params.id}`}>
     View Product <LaunchIcon />
    </Link>
   ),
  },
 ];


 const rows = [];

 data &&
  data.forEach((element) => {
   rows.push({
    id: element._id,
    status: element.name,
    orderQuantity: element.stock,
    Amount: element.price,
   });
  });
 return <div className="adminProducts">
  <MetaData title={"admin products"} />

  <div>
   <Sidebar />
  </div>
  <div className="maincontainer">
   <DataGrid columns={column} rows={rows} className="abchdf" /></div>;
 </div>
};

export default AdminProducts;
