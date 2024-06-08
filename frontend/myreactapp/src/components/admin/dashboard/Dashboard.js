import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import './dashboard.scss'
import Typography from '@mui/material/Typography';
import { Doughnut } from 'react-chartjs-2';


import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 ArcElement,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../../store/action/producAction";
import { getAdminOrders } from "../../../store/action/orderAction";
import { allUserAction } from "../../../store/action/userAction";

// Register Chart.js components
ChartJS.register(
 CategoryScale,
 LinearScale,
 ArcElement,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
);

const Dashboard = () => {
 const { allUser } = useSelector(state => state.allusers)
 const { data: orders } = useSelector(state => state.adminOrders)
 const { data: products } = useSelector(state => state.adminProducts)
 let instock = 0;
 const outstock = products?.reduce((acc, product) => {
  if (product.stock < 2) {
   return ++acc;
  } else {
   instock++;
  }
  return acc
 }, 0)


 const labels = ["January", "February", "March", "April", "May", "June", "July"];

 const productASales = [120, 135, 125, 145, 160, 150, 170];
 const productBSales = [80, 75, 95, 100, 110, 105, 120];

 const options = {
  responsive: true,
  plugins: {
   legend: {
    position: "top",
   },
   title: {
    display: true,
    text: "Line Chart: Monthly Sales Trend for Products A & B",
   },
  },
 };
 const doughnutData = {
  labels: ["instock", "outOfStock"],
  datasets: [
   {
    label: "instock",
    data: [instock, outstock],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: ["rgba(4, 255, 37, 0.5)", "rgba(0, 38, 255, 0.5)"],
    hoverBackgroundColor: ["rgb(4, 255, 37)", "rgb(0, 38, 255)"],
   }
  ]
 }
 const data = {
  labels,
  datasets: [
   {
    label: "Product A Sales",
    data: productASales,
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
    hoverBackgroundColor: "rgba(255, 99, 132, 0.5)",
   },
   {
    label: "Product B Sales",
    data: productBSales,
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
    hoverBackgroundColor: "rgba(53, 162, 235, 0.5)",
   },
  ],
 };
 const dispatch = useDispatch()
 useEffect(() => {
  dispatch(getAdminProduct())
  dispatch(getAdminOrders())
  dispatch(allUserAction())
 }, []);

 return (
  <div className="dashboard">
   <div>
    <Sidebar />
   </div>
   <div className="mainContent">
    <Typography variant="h3">Dashboard</Typography>
    <div className="dashboardcontent">
     <div className="total">total 5000rs</div>
     <div className="dashboardbox">
      <Link to={"/admin/products"}>
       {products && <p>Product {products.length}</p>}
      </Link>
      <Link to={"/admin/orders"}>
       {orders && <p>Order {orders.length}</p>}
      </Link>
      <Link to={"/admin/users"}>
       <p>User {allUser.length}</p>
      </Link>
     </div>
     <Line data={data} options={options} />
     <Doughnut
      options={options}
      data={doughnutData} />
    </div>
   </div>
  </div>
 );
};

export default Dashboard;
