import React, { useEffect } from "react";
import style from "./shiping.module.scss";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import { shipingAction } from "../../../../../store/action/cartAction";
import MetaData from "../../../MetaData";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FaShippingFast } from "react-icons/fa";
import { LiaAccusoft } from "react-icons/lia";
import { LiaAdobe } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
function Shiping() {
 const data = useSelector((state) => state.userCart.shipingData) || {};
 const [name, setName] = React.useState(data.name);
 const [adress, setAdress] = React.useState(data.adress);
 const [pindoce, setPincode] = React.useState(data.pincode);
 const [number, setNumber] = React.useState(data.number);
 const [country, setCountry] = React.useState(data.country);
 const [state, setState] = React.useState(data.state);
 const [activeAt, setActiveAt] = React.useState(0);
 const dispatch = useDispatch();
 const user = useSelector((state) => state.userData);
 const navigate = useNavigate()
 const steps = [
  { label: "Shiping", icon: <FaShippingFast size={30} /> },
  { label: "confirm", icon: <LiaAccusoft size={30} /> },
  { label: "payment", icon: <LiaAdobe size={30} /> },
 ];
 const handleSubmit = (e) => {
  e.preventDefault();
  const shipingData = {
   name,
   adress,
   number,
   pincode: pindoce,
   country,
   state,
  };
  dispatch(shipingAction(shipingData));
  navigate("/order/confirm");
 };
 useEffect(() => {

  if (data.error) {
   alert(data.error.message);
  }
  if (!user.isAuthenticated) {
   navigate("/cart");
  }
 }, [data]);
 return (
  <div className={style.container}>
   <MetaData title="Shiping" />
   <Stepper
    style={{ margin: "2vh", width: "100%" }}
    activeStep={activeAt}
    alternativeLabel
   >
    {steps.map((item, index) => (

     <Step key={item.label} active={activeAt === index ? true : false} >
      <StepLabel style={index <= activeAt ? { color: "red" } : {}} icon={item.icon}>{item.label}</StepLabel>
     </Step>
    ))}
   </Stepper>
   <form onSubmit={handleSubmit}>
    <div><Typography>Name:</Typography>
     <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
     />
    </div>
    <div><Typography>Address:</Typography>
     <input
      type="text"
      placeholder="adress"
      value={adress}
      onChange={(e) => setAdress(e.target.value)}
     />
    </div>
    <div><Typography>Pincode:</Typography>
     <input
      type="number"
      placeholder="pincode"
      value={pindoce}
      onChange={(e) => setPincode(e.target.value)}
     />
    </div>
    <div>
     <Typography>Number:</Typography>
     <input
      type="number"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      placeholder="contact number"
     />
    </div>
    <Typography>Country:</Typography>
    <select
     value={country}
     required
     onChange={(e) => setCountry(e.target.value)}
    >
     <option className="options" value="option1">
      Country
     </option>
     {Country.getAllCountries().map((item, index) => {
      return (
       <option className="options" value={item.isoCode} key={index}>
        {item.name}
       </option>
      );
     })}
    </select>
    {country && (
     <select
      value={state}
      required
      onChange={(e) => setState(e.target.value)}
     >
      <option className="options" value="option1">
       State
      </option>
      {State.getStatesOfCountry(country).map((item, index) => {
       return (
        <option className="options" value={item.isoCode} key={index}>
         {item.name}
        </option>
       );
      })}
     </select>
    )}
    <input type="submit" disabled={state ? false : true} value="Submit" />
   </form>
  </div>
 );
}

export default Shiping;
