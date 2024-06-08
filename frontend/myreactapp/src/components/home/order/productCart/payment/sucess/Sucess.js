import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./sucess.scss";
import { useNavigate } from "react-router-dom";

const Success = () => {
 const navigate = useNavigate();

 return (
  <div className="success-container">
   <div className="success-icon">
    <FaCheckCircle className="animated-icon" />
   </div>
   <h1>Payment Successful!</h1>
   <div className="button-container">
    <button className="nav-button" onClick={() => navigate("/")}>
     Go to Home
    </button>
    <button className="nav-button" onClick={() => navigate("/orders")}>
     View Orders
    </button>
   </div>
  </div>
 );
};

export default Success;
