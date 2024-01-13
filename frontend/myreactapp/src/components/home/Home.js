import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import './home.scss'
import image from '../../images/0nline-trends-2022.png'
import ProductCards from './ProductCards';
import MetaData from './MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../store/action/producAction';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
function Home() {
 const { products, loading, error, productCount } = useSelector(state =>
  state.products
 )
 const dispatch = useDispatch();
 const alert = useAlert()
 useEffect(() => {
  if (error) {
   alert.error(error.message)
  }
  dispatch(getProduct())
 }, [dispatch, error, alert])
 console.log(products);
 return (
  <Fragment>
   <MetaData />
   <div className="banner">
    <h2>
     Welcome
    </h2>
    <p>this is home page</p>
    <a href="#container"><button>
     scroll <CgMouse />
    </button></a>
   </div>
   <div className="homeheading">Featured products</div>

   <div className="container" id='container'>
    {loading ? <Loader /> : products &&

     products.map((product, index) => {
      return <ProductCards key={index} product={product} />
     })
    }


   </div>
  </Fragment>
 )
}

export default Home