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

import { useSelector } from 'react-redux';
import UserOption from './components/layout/header/UserOption';
import Profile from './components/users/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UpdateProfile from './components/users/updateProfile.js/UpdateProfile';
import UpdatePassword from './components/users/updatePassword/UpdatePassword';
import ResetLink from './components/users/Profile/resetlink/ResetLink';
import ResetPassword from './components/users/Profile/resetPassword/ResetPassword';
import ProductCart from './components/home/order/productCart/ProductCart';
function App() {
 const user = useSelector((state) => state.userData);
 const { loading } = useSelector((state) => state.userData);

 const dispatch = useDispatch();
 useEffect(() => {
  webfont.load({
   google: {
    families: ["Roboto"],
   },
  });
  dispatch(loadUser());
 }, [dispatch]);
 return (
  <>
   {loading !== undefined && !loading && <div>
    <Header />
    {user.isAuthenticated && <UserOption user={user} />}
    <Routes>
     <Route path="/" element={<Home />} />
     <Route exact path="/product/:id" element={<ProductDetails />} />
     <Route path="/products/:keyword" element={<Products />} />
     <Route exact path="/products" element={<Products />} />
     <Route path="/search" element={<Search />} />
     <Route path="/login" element={<Auth />} />
     <Route path="/auth" element={<Auth />} />
     <Route path="/register" element={<Auth />} />
     <Route path="/password/reset/" element={<ResetLink />} />
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
      element={
       user?.isAuthenticated ? <ProductCart /> : <NavigateAuth />
      }
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
