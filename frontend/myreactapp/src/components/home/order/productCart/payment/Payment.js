import React, { useState, useRef } from "react";
import { FaCreditCard, FaShippingFast } from "react-icons/fa";
import { MdOutlineEventNote, MdVpnKeyOff } from "react-icons/md";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import MetaData from "../../../MetaData";
import style from "./payment.module.scss";
import {
 CardCvcElement,
 CardNumberElement,
 CardExpiryElement,
 useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useElements } from "@stripe/react-stripe-js";
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { LiaAccusoft, LiaAdobe } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../../../../../store/action/orderAction";
import Loader from "../../../../layout/loader/Loader";

const Payment = () => {
 const { cartItems, shipingData } = useSelector((state) => state.userCart);
 const { error, loading } = useSelector((state) => state.newOrder);
 const [cardCvc, setCardCvc] = useState("");
 const [cardExpire, setCardExpire] = useState("");
 const [load, setload] = useState(false)
 const submitButtonRef = useRef(null);
 const stripe = useStripe();
 const dispatch = useDispatch();
 const elements = useElements();
 const alert = useAlert();
 const navigate = useNavigate();
 const steps = [
  { label: "Shiping", icon: <FaShippingFast size={30} /> },
  { label: "confirm", icon: <LiaAccusoft size={30} /> },
  { label: "payment", icon: <LiaAdobe size={30} /> },
 ];
 const dataorder = JSON.parse(sessionStorage.getItem("orderData"));


 const handlesubmit = async (e) => {
  setload(true);
  e.preventDefault();
  const paymentData = {
   amount: 1000, // Amount in cents
  };
  submitButtonRef.current.disabled = true;
  try {
   console.log("requesting");
   const result = await axios.post('/app/v1/payment/process', { amount: 1000 });
   console.log(result);
   if (result.data.success) {
    const { client_secret } = result.data;
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
     payment_method: {
      card: elements.getElement(CardNumberElement),
      billing_details: {
       name: "John Doe",
      },
     },
    });
    if (paymentResult.error) {
     console.log(paymentResult.error.message);
     alert.error("Payment failed");
    } else if (paymentResult.paymentIntent.status === "succeeded") {
     // Payment successful
     setload(false);
     dispatch(orderAction({
      shipingInfo: shipingData,
      orderItem: cartItems,
      totalPrice: dataorder.total,
      shippingPrice: dataorder.shipingprice,
      itemsPrice: dataorder.itemprice,
      taxPrice: dataorder.gst,
     }))
     alert.success("Payment successful");
     navigate('/success');
    }
   }
  } catch (error) {
   setload(false);
   submitButtonRef.current.disabled = false;
   console.log(error);
  }


 };
 const activeStep = 2;


 return (
  <>
   {(load || loading) && <Loader />}

   <MetaData title="Shiping" />
   <Stepper style={{ margin: "2vh" }} activeStep={activeStep} alternativeLabel>
    {steps.map((item, index) => (
     <Step key={item.label} active={activeStep === index ? true : false}>
      {" "}
      <StepLabel
       style={index <= activeStep ? { color: "red" } : {}}
       icon={item.icon}
      >
       {item.label}
      </StepLabel>
     </Step>
    ))}
   </Stepper>
   <form onSubmit={handlesubmit} className={style.form}>
    <div className={style.paymentinput}>
     <FaCreditCard />
     <CardNumberElement className={style.element} />
    </div>
    <div className={style.paymentinput}>
     <MdVpnKeyOff />
     <CardCvcElement className={style.element} />
    </div>
    <div className={style.paymentinput}>
     <MdOutlineEventNote />
     <CardExpiryElement className={style.element} />
    </div>
    <div className={style.submit}>
     <input type="submit" value="Pay" ref={submitButtonRef} />
    </div>
   </form>
  </>
 );
};

export default Payment;
