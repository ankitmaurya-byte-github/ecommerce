import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Fragment } from 'react'
import Pagination from "react-js-pagination";
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
 let { products, loading, dataPerPage, totalDoc, error } = useSelector(state => state.products)
 const [currentpage, setcurrentpage] = useState(1)
 const handelPageChange = (e) => {
  setcurrentpage(e)
 }
 useEffect(() => {
  if (error) {
   alert.error(error)
   dispatch(clearError())
  }
  dispatch(getProduct(params.keyword, currentpage))
 }, [error, dispatch, currentpage, alert, params])


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
     <div className="paginationBox">
      <Pagination
       activePage={currentpage}
       itemsCountPerPage={dataPerPage}
       totalItemsCount={totalDoc}
       pageRangeDisplayed={5}
       onChange={handelPageChange}
       nextPageText="Next"
       prevPageText="Prev"
       firstPageText="1st"
       lastPageText="Last"
       itemClass="page-item"
       linkClass="page-link"
       activeClass="pageItemActive"
       activeLinkClass="pageLinkActive"
      />
     </div>
    </Fragment>}
  </Fragment>
 )
}

export default Products