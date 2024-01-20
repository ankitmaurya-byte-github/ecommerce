import Header from './components/layout/header/Header';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import webfont from 'webfontloader'
import Footer from './components/layout/footer/Footer';
import ProductDetails from './components/product/ProductDetails';
import Home from './components/home/Home';
import Products from './components/product/Products';
import Search from './components/product/search/Search';
import Auth from './components/users/Auth';
function App() {

 useEffect(() => {
  webfont.load({
   google: {
    families: ['Roboto'],
   },
  })
 }, [])
 return (
  <Router>
   <Header />
   <Routes>
    <Route path='/' element={<Home />} />
    <Route exact path='/product/:id' element={<ProductDetails />} />
    <Route path='/products/:keyword' element={<Products />} />
    <Route exact path='/products' element={<Products />} />
    <Route path='/search' element={<Search />} />
    <Route path='/login' element={<Auth />} />
    <Route path='/auth' element={<Auth />} />
    <Route path='/register' element={<Auth />} />
   </Routes>
   <Footer />
  </Router>
 );
}

export default App;
