import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { useAlert } from 'react-alert';
import { clearError } from '../../store/action/producAction';
import { getProduct } from '../../store/action/producAction';
import Loader from '../layout/loader/Loader';
import ProductCards from '../home/ProductCards';
import './products.scss'
import { useParams } from 'react-router-dom';
function Products() {
 const dispatch = useDispatch()
 const alert = useAlert()
 const params = useParams()
 const { products, loading, error } = useSelector(state => state.products)
 let key = params.keyword
 useEffect(() => {
  if (error) {
   alert.error(error)
   dispatch(clearError())
  }
  dispatch(getProduct(key))
 }, [error, dispatch, alert, key])


 return (
  <Fragment>
   <h2 className="header">PRODUCTS</h2>
   {loading ? <Loader /> :
    <Fragment>
     <div className="products">
      {products && products.map((data, i) => {
       return <ProductCards product={data} key={i} />
      })}
     </div>
    </Fragment>}
  </Fragment>
 )
}

export default Products