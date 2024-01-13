import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { clearError } from '../../store/action/producAction';
import { useSelector, useDispatch } from 'react-redux';
import ReviewCard from './reviewsCard/ReviewCard';
import ReactStars from "react-rating-stars-component";
import { getProductDetail } from '../../store/action/producAction';
import Carousel from 'react-material-ui-carousel'
import { useAlert } from 'react-alert';
import Loader from '../layout/loader/Loader';
import './productdetails.scss'
function ProductDetails() {
 const alert = useAlert()
 const { error, loading, products } = useSelector(state => state.productDetail)
 const { id } = useParams();
 const dispatch = useDispatch()


 const option = {
  edit: true,
  count: 5,
  onChang: "ratingChanged",
  size: 20,
  value: products?.ratings || 0,
  isHalf: true,
  activeColor: "#ffd700"
 }


 useEffect(() => {
  if (error) {
   alert.error(error.message)
   dispatch(clearError())
  }
  dispatch(getProductDetail(id))
 }, [dispatch, alert, error, id])


 return (
  <Fragment>
   {loading ? <Loader /> : <Fragment>
    <div className="productDetail">
     <div><Carousel>
      {products?.images && products.images.map((items, i) => {
       return <img key={i} src={`${items.url}`} alt="" />
      })}
     </Carousel></div>
     <div>
      {/* name product id */}
      <div className="detailsBlock_a">
       <h2>{products.name}</h2>
       <p>Product ID #{products._id}</p>
      </div>
      {/* reviews */}
      <div className='detailsBlock_b'>
       <ReactStars {...option} />
       <span>({products.numOfReviews} Reviews)</span>
      </div>
      {/* price buy option  */}
      <div className='detailsBlock_c'>
       <h1>${products.price}</h1>
       <div className="detailsBlock_c1">
        <div className="detailsBlock_c1a">
         <button>-</button>
         <input type='number' value='1' />
         <button>+</button>
        </div>
        <button>
         Add To Cart
        </button>
       </div>
       <p>Status :<b className={products.stock < 1 ? "redColor" : "greenColor"}>
        {products.stock < 1 ? "outOfStock" : "inStock"}
       </b></p>
      </div>
      <div className="detailsBlock_d">
       Description :{products.description}
      </div>
      <button className="submitReview">Submit Review</button>
     </div>
    </div>
    <h1 className='reviewHeading'>Reviews</h1>


    {products.reviews && products.reviews[0] ? <div className='reviews'>
     {products.reviews.map((item, i) => {
      return <ReviewCard detail={item} key={i} />
     })}
    </div> : <div className='noReviews'>No Reviews</div>}
   </Fragment>
   }
  </Fragment>
 )
}

export default ProductDetails