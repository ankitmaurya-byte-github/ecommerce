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
 const { error, loading, product } = useSelector(state => state.productDetail)
 const { id } = useParams();
 const dispatch = useDispatch()


 const option = {
  edit: true,
  count: 5,
  onChang: "ratingChanged",
  size: 20,
  value: product?.ratings || 0,
  isHalf: true,
  activeColor: "#ffd700"
 }

 useEffect(() => {
  const scrollToTop = () => {
   window.scrollTo({
    top: 0,
    // behavior: 'smooth' // Optional: Adds smooth scrolling animation
   });
  };

  // Scroll to top on component mount or page reload
  scrollToTop();
 }, []);

 useEffect(() => {
  if (error) {
   alert.error(error.message)
   dispatch(clearError())
  }
  dispatch(getProductDetail(id))
 }, [dispatch, alert, error, id])
 const handleCountChange = () => {

 }

 return (
  <Fragment>
   {loading ? <Loader /> : <Fragment>
    <div className="productDetail">
     <div><Carousel>
      {product?.images && product.images.map((items, i) => {
       return <img key={i} src={`${items?.url}`} alt="" />
      })}
     </Carousel></div>
     <div>
      {/* name product id */}
      <div className="detailsBlock_a">
       <h2>{product?.name}</h2>
       <p>Product ID #{product._id}</p>
      </div>
      {/* reviews */}
      <div className='detailsBlock_b'>
       <ReactStars {...option} />
       <span>({product?.numOfReviews} Reviews)</span>
      </div>
      {/* price buy option  */}
      <div className='detailsBlock_c'>
       <h1>${product.price}</h1>
       <div className="detailsBlock_c1">
        <div className="detailsBlock_c1a">
         <button>-</button>
         <input type='number' onChange={handleCountChange} value='1' />
         <button>+</button>
        </div>
        <button>
         Add To Cart
        </button>
       </div>
       <p>Status :<b className={product.stock < 1 ? "redColor" : "greenColor"}>
        {product.stock < 1 ? "outOfStock" : "inStock"}
       </b></p>
      </div>
      <div className="detailsBlock_d">
       Description :{product.description}
      </div>
      <button className="submitReview">Submit Review</button>
     </div>
    </div>
    <h1 className='reviewHeading'>Reviews</h1>


    {product.reviews && product.reviews[0] ? <div className='reviews'>
     {product.reviews.map((item, i) => {
      return <ReviewCard detail={item} key={i} />
     })}
    </div> : <div className='noReviews'>No Reviews</div>}
   </Fragment>
   }
  </Fragment>
 )
}

export default ProductDetails