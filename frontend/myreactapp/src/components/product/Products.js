import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Fragment } from 'react'
import Pagination from "react-js-pagination";
import { useAlert } from 'react-alert';
import Box from '@mui/material/Box';
import { clearError } from '../../store/action/producAction';
import ReactStars from "react-rating-stars-component";
import { getProduct } from '../../store/action/producAction';
import { TbCategoryFilled } from "react-icons/tb";
import Typography from '@mui/material/Typography';
import Loader from '../layout/loader/Loader';
import ProductCards from '../home/ProductCards';
import './products.scss'
import { useParams } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { IoMdPricetags } from "react-icons/io";
function Products() {
 // usehooks
 const dispatch = useDispatch()
 const alert = useAlert()
 const params = useParams()
 let { products, loading, dataPerPage, filterProductCount, totalDoc, error } = useSelector(state => state.products)

 //usestate
 const [currentpage, setcurrentpage] = useState(1)
 const [slideValue1, setSlideValue1] = useState([500, 1500])
 const [catogory, setCatogory] = useState([])
 const [rating, setRating] = useState(3)
 //variabledeclare
 const minDistance = 100;
 const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
 ];
 const option = {
  edit: true,
  count: 5,
  onChang: (e) => {
   console.log(e);
   // setRating(e)
  },
  size: 30,
  value: 4,
  activeColor: "#ffd700"
 }
 const [catogerySelected, setCatogerySelected] = useState(Array(categories.length).fill(false))


 // useEffect
 useEffect(() => {
  const scrollToTop = () => {
   window.scrollTo({
    top: 0,
   });
  };

  scrollToTop();
 }, []);
 useEffect(() => {
  if (error) {
   alert.error(error)
   dispatch(clearError())
  }
  dispatch(getProduct(params.keyword, currentpage, slideValue1, rating, catogory))
 }, [error, catogory, rating, dispatch, currentpage, slideValue1, alert, params])

 // handlefunction

 const handelPageChange = (e) => {
  setcurrentpage(e)
 }

 const handleChange1 = (event, newValue, activeThumb) => {
  if (!Array.isArray(newValue)) {
   return;
  }

  if (activeThumb === 0) {
   setSlideValue1([Math.min(newValue[0], slideValue1[1] - minDistance), slideValue1[1]]);
  } else {
   setSlideValue1([slideValue1[0], Math.max(newValue[1], slideValue1[0] + minDistance)]);
  }
 };

 //logging
 console.log(catogory);


 // rendercomponents
 return (
  <Fragment>
   {/* header */}
   <h2 className="header">PRODUCTS</h2>

   {/* body */}
   {loading ? <Loader /> :
    <Fragment>
     {/* products */}
     <div className="products">
      {products && products.map((data, i) => {
       return <ProductCards product={data} key={i} />
      })}
     </div>
     {/* filter */}
     <div className="filterbox">
      <Typography><IoMdPricetags />Price</Typography>
      <Slider
       getAriaLabel={() => 'Minimum distance'}
       value={slideValue1}
       onChange={handleChange1}
       valueLabelDisplay="auto"
       min={0}
       max={2000}
      />

      <Typography><TbCategoryFilled />Catogories</Typography>
      <ul className="catogoriesList">

       {categories.map((item, i) => {
        return <li className={catogerySelected[i] ? "selected" : "notselected"} key={i} onClick={() => {
         let temp = [...catogerySelected]
         temp[i] = !temp[i]
         setCatogerySelected(temp)
         if (catogerySelected[i]) {
          temp = [...catogory]
          temp.pop(item)
          setCatogory(temp)
         } else {
          temp = [...catogory]
          temp.push(item)
          setCatogory(temp)
         }

        }}>
         {item}
        </li>
       })}
      </ul>
      <fieldset><legend><Typography>Above Rating</Typography><ReactStars  {...option} /></legend></fieldset>

     </div>
     {filterProductCount > dataPerPage ?
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
      </div> : ""}
    </Fragment>}
  </Fragment>
 )
}

export default Products