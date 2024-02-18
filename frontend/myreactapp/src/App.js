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
import { useSelector } from 'react-redux';
import UserOption from './components/layout/header/UserOption';
import Profile from './components/users/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UpdateProfile from './components/users/updateProfile.js/UpdateProfile';
function App() {
 const user = useSelector(state => state.userData)
 const dispatch = useDispatch()
 useEffect(() => {
  webfont.load({
   google: {
    families: ['Roboto'],
   },
  })
  dispatch(loadUser())
 }, [dispatch])

 return (
  <div>
   <Header />
   {user.isAuthenticated && <UserOption user={user} />}
   {/* <UserOption user={user} /> */}
   <Routes>
    <Route path='/' element={<Home />} />
    <Route exact path='/product/:id' element={<ProductDetails />} />
    <Route path='/products/:keyword' element={<Products />} />
    <Route exact path='/products' element={<Products />} />
    <Route path='/search' element={<Search />} />
    <Route path='/login' element={<Auth />} />
    <Route path='/auth' element={<Auth />} />
    <Route path='/register' element={<Auth />} />
    {user.isAuthenticated && <Route path='/profile/me/update' element={<UpdateProfile />} />}
    {user.isAuthenticated && <Route exact path='/profile' element={<Profile />} />}
   </Routes>
   <Footer />
  </div>
 );
}
function ProtectedRoutes() {
 return (
  <>
   <ProtectedRoute path="/profile" element={<Profile />} />
  </>
 );
}
export default App;
