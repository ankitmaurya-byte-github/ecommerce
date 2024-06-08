import React, { useState } from "react";
import style from "./order.module.scss";
import { useSelector } from "react-redux";
import MetaData from "../../MetaData";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { FaShippingFast } from "react-icons/fa";
import { LiaAccusoft, LiaAdobe } from "react-icons/lia";
import CartItems from "../productCart/cartItemsCards/CartItems";
import { useNavigate } from "react-router-dom";

function OrderPage() {
 const navigate = useNavigate()
 const { cartItems, shipingData } = useSelector((state) => state.userCart);
 const [cartProducts, setCartProducts] = useState(cartItems);
 const steps = [
  { label: "Shiping", icon: <FaShippingFast size={30} /> },
  { label: "confirm", icon: <LiaAccusoft size={30} /> },
  { label: "payment", icon: <LiaAdobe size={30} /> },
 ];
 const [activeAt, setActiveAt] = React.useState(1);

 const subtotal = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
 );
 const gst = 0.18 * subtotal;
 const shipingPrice = subtotal > 1000 ? 0 : 100;
 const total = subtotal + gst + shipingPrice;

 const handlePayment = () => {
  const data = {
   itemprice: subtotal,
   total: total,
   shipingPrice: shipingPrice,
   gst: gst,
   adress: shipingData.adress,
  }

  // {
  //  shipingInfo: shipingData,
  //   orderItem : cartItems,
  //   totalPrice: total
  // }

  sessionStorage.setItem("orderData", JSON.stringify(data));
  navigate("/payment");
  console.log("Payment initiated");
 };

 return (
  <div className={style.orderPage}>
   <MetaData title="Shiping" />
   <Stepper
    style={{ margin: "2vh", width: "100%" }}
    activeStep={activeAt}
    alternativeLabel
   >
    {steps.map((item, index) => (
     <Step key={item.label} active={activeAt === index ? true : false}>
      <StepLabel
       style={index <= activeAt ? { color: "red" } : {}}
       icon={item.icon}
      >
       {item.label}
      </StepLabel>
     </Step>
    ))}
   </Stepper>
   <div className={style.orderContainer}>
    <div className={style.shipingInfo}>
     <div>Shipping Details</div>
     <div>
      <Typography>Name:</Typography> {shipingData.name}
     </div>
     <div>
      <Typography>Number:</Typography> {shipingData.Number}
     </div>
     <div>
      <Typography>Address:</Typography>
      {shipingData.adress},{shipingData.pincode},{shipingData.state},
      {shipingData.country}
     </div>
    </div>

    <div className={style.orderSummary}>
     order summary
     <div className="subtotal">Subtotal :{subtotal}</div>
     <div className="shippingcharges">Shipping : {shipingPrice}</div>
     <div className="gst">GST : {gst}</div>
     <div className="total">Toal : {total}</div>
     <button onClick={handlePayment}>proceed to pay</button>
    </div>

    <div className={style.cartItems}>
     cart item
     <div className={style.cartItems}>
      {cartItems.map((item, index) => {
       return (
        <CartItems
         details={{ cartProducts, setCartProducts }}
         index={index}
         key={index}
         item={item}
        />
       );
      })}
     </div>
    </div>
   </div>
  </div>
 );
}

export default OrderPage;
