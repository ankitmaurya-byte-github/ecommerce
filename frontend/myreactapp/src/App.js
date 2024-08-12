import Header from './components/layout/header/Header';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import webfont from 'webfontloader'
import Footer from './components/layout/footer/Footer';
import ProductDetails from './components/product/ProductDetails';
import { useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import Products from './components/product/Products';
import Search from './components/product/search/Search';
import Auth from './components/users/Auth';
import { loadUser } from './store/action/userAction';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
// import { FaUser, FaUserAlt, FaLock } from 'react-icons/Fa';
import { Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import UserOption from './components/layout/header/UserOption';
import Profile from './components/users/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UpdateProfile from './components/users/updateProfile.js/UpdateProfile';
import UpdatePassword from './components/users/updatePassword/UpdatePassword';
import ResetLink from './components/users/Profile/resetlink/ResetLink';
import ResetPassword from './components/users/Profile/resetPassword/ResetPassword';
import ProductCart from './components/home/order/productCart/ProductCart';
import Shiping from './components/home/order/productCart/shiping/Shiping';
import OrderPage from './components/home/order/usersOrders/Orders';
import axios from 'axios';
import Payment from './components/home/order/productCart/payment/Payment';
import { useAlert } from 'react-alert';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import Sucess from './components/home/order/productCart/payment/sucess/Sucess';
import UserOrders from './components/home/order/userOrders';
import OrderDetails from './components/home/order/orderDetails/OrderDetails';
import Dashboard from './components/admin/dashboard/Dashboard.js';
import AdminProducts from './components/admin/products/AdminProducts.js';
import Adminorder from './components/admin/order/Adminorder..js';
import CreateProduct from './components/admin/products/createProduct/CreateProduct.js';

function App() {
 const alert = useAlert()
 const user = useSelector((state) => state.userData);
 const { loading } = useSelector((state) => state.userData);
 const [stripeApiKey, setStripeApiKey] = useState()
 async function getStripeApiKey() {
  try {
   const { data } = await axios.get('/app/v1/getApiKey')
   setStripeApiKey(data.stripeApiKey)
  }
  catch (err) {
   console.log("this is catch ");
   // alert.error(err)
  }

 }

 const dispatch = useDispatch();
 useEffect(() => {
  webfont.load({
   google: {
    families: ["Roboto"],
   },
  });
  dispatch(loadUser());
  getStripeApiKey()
 }, [dispatch]);
 return (
  <>
   {loading !== undefined && !loading && <div>
    <Header />
<<<<<<< HEAD
=======
    <FaSearch
     onClick={() => navigate('/search')}
     size={30}
     style={{
      color: "#858585",
      padding: "14px",
      zIndex: 50,
      background: "#d9a8b02e",
      borderRadius: "50px",
      position: "fixed",
      // borderRadius: '50%',

      right: "80px",
      top: "16px",
      transition: "transform 0.2s",
      ":hover": {
       cursor: "pointer",
       padding: "14px",
       fontSize: "40px",
      },
     }}
    />




>>>>>>> final
    <UserOption user={user} />
    <Routes>
     <Route path="/" element={<Home />} />
     <Route exact path="/product/:id" element={<ProductDetails />} />
     <Route path="/products/:keyword" element={<Products />} />
     <Route exact path="/products" element={<Products />} />
     <Route path="/search" element={<Search />} />
     <Route path="/shipping" element={<Shiping />} />
     <Route path="/success" element={<Sucess />} />
     <Route path="/login" element={<Auth />} />
     <Route path="/auth" element={<Auth />} />
     <Route path="/order/confirm" element={<OrderPage />} />
     <Route path="/order/:id" element={<OrderDetails />} />
     <Route path="/register" element={<Auth />} />
     <Route path="/orders" element={<UserOrders />} />
     <Route path="admin/dashboard" element={<Dashboard />} />
     <Route path="admin/products" element={<AdminProducts />} />
     <Route path="admin/create/product" element={<CreateProduct />} />
     <Route path="admin/orders" element={<Adminorder />} />
     <Route path="/password/reset/" element={<ResetLink />} />
     {stripeApiKey && <Route path="/payment/" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />}
     <Route path="/password/reset/:token" element={<ResetPassword />} />
     {user.isAuthenticated && (
      <Route path="/profile/me/update" element={<UpdateProfile />} />
     )}
     {user.isAuthenticated && (
      <Route path="/password/me/update" element={<UpdatePassword />} />
     )}
     <Route
      path="/profile"
      element={user.isAuthenticated ? <Profile /> : <NavigateAuth />}
     />
     <Route
      path="/cart"
      element={<ProductCart />}
     />
    </Routes>
    <Footer />
   </div>}
  </>


 );
}

function NavigateAuth() {
 return <Navigate to="/login" />
}

export default App;
