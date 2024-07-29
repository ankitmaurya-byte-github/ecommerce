import React, { useEffect } from "react";
import './adminProducts.scss'
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAdminProduct } from "../../../store/action/producAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../../home/MetaData";
import { Link, useNavigate } from "react-router-dom";
import './adminProducts.scss'
import { Sidebar } from "../dashboard/sidebar/Sidebar";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
const AdminProducts = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate();
 const { data } = useSelector(state => state.adminProducts)
 useEffect(() => {
  dispatch(getAdminProduct())
 }, []);
 const handeldelete = (params) => {

  dispatch(deleteProduct(params.row.id))
 }
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
    <div className="action">  <Link to={`/product/${params.id}`}>
     View<LaunchIcon size={25} />
    </Link><FaEdit className="editbutton" onClick={() => navigate(`/admin/${params.id}`)} size={25} /> <RiDeleteBin5Line onClick={() => handeldelete(params)} className="deletebutton" size={25} />
    </div>

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

  <div style={{ maxWidth: '200px' }}>
   <Sidebar />
  </div>
  <div className="maincontainer">
   <DataGrid columns={column} rows={rows} className="abchdf" /></div>;
 </div>
};

export default AdminProducts;
