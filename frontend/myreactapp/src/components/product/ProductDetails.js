import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { addNewReviewAction, clearError, clearProductDetail } from '../../store/action/producAction';
import { useSelector, useDispatch } from 'react-redux';
import ReviewCard from './reviewsCard/ReviewCard';
import ReactStars from "react-rating-stars-component";
import { getProductDetail } from '../../store/action/producAction';
import Carousel from 'react-material-ui-carousel'
import { useAlert } from 'react-alert';
import Loader from '../layout/loader/Loader2';
import './productdetails.scss'
import { addProductToCart } from '../../store/action/cartAction';
import { useNavigate } from 'react-router-dom';
function ProductDetails() {
 const alert = useAlert()

 const { error, loading, success, product } = useSelector(
  (state) => state.productDetail
 );
 const {
  error: reviewError,
  loading: reviewLoading,
  success: reviewSuccess,
 } = useSelector((state) => state.userReview);
 const { id } = useParams();
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const [productCount, setProductCount] = useState(1)
 const [newReviewRating, setNewReviewRating] = useState(0);
 const ratingChange = (newRating) => {
  setNewReviewRating(newRating);
  console.log(newRating);
  console.log("rating changed");
 };

 const option = {
  edit: false,
  count: 5,
  onChange: ratingChange,
  value: product?.ratings,
  size: 20,
  isHalf: true,
  activeColor: "#ffd700",
 };

 console.log(option)
 const [submitView, setSubmitView] = useState(false);
 const targetRef = useRef(null);
 const commentRef = useRef(null);
 useEffect(() => {
  console.log("product");
  dispatch(getProductDetail(id))
  if (reviewSuccess) {
   alert.success("Review Submitted Successfully");
   setSubmitView(false);
  }
  return () => {
   console.log("clearing product detail");
   dispatch(clearProductDetail())
  };

 }, [reviewSuccess]);
 useEffect(() => {
  if (error || reviewError) {
   alert.error(error?.message || reviewError?.message);
   dispatch(clearError());
   navigate('/')
  } else if (reviewSuccess) {
   alert.success("Review Submitted Successfully");
   setSubmitView(false);
  }
 }, [dispatch, alert, error, id, reviewError]);

 const handelReviewSubmit = () => {
  dispatch(
   addNewReviewAction({
    rating: newReviewRating,
    comment: commentRef.current.value,
    productId: product._id,
   })
  );

 };

 return (
  <Fragment>
   {(loading || reviewLoading || !product) && <Loader />}
   {console.log(option.value)}
   <div className="productDetail">
    {() => {
     console.log(product)
     return <p>fgh</p>
    }}
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
      <ReactStars {...option} key={product?.ratings} />
      <span>({product?.numOfReviews} Reviews)</span>
     </div>
     {/* price buy option  */}
     <div className='detailsBlock_c'>

      <h1>${product.price}</h1>
      <div className="detailsBlock_c1">
       <div className="detailsBlock_c1a">
        <button onClick={() => productCount > 1 && setProductCount(productCount - 1)}>-</button>
        <input readOnly type='text' value={productCount} />
        <button onClick={() => product.stock > productCount && setProductCount(productCount + 1)}>+</button>
       </div>
       <button onClick={() => {
        alert.success('Added to cart')
        dispatch(addProductToCart({ ...product, quantity: productCount }))
       }} >
        Add To Cart
       </button>

      </div>
      <button onClick={() => { navigate('/cart') }} >
       Go To Cart
      </button>
      <p>Status :<b className={product.stock < 1 ? "redColor" : "greenColor"}>
       {product.stock < 1 ? "outOfStock" : "inStock"}
      </b></p>
     </div>
     <div className="detailsBlock_d">
      Description :{product.description}
     </div>
     <button className="submitReview" onClick={() => {
      setSubmitView(true)
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
     }}>Submit
      Review</button>
    </div>
   </div>


   {submitView && <div className='submitView'>
    <h1>Submit Review</h1>
    <ReactStars {...option} value={0} edit={true} size={44} />
    <input type="text" ref={commentRef} placeholder="enter you review" />
    <button onClick={handelReviewSubmit}>Submit</button>
    <button onClick={() => setSubmitView(false)}>Cancel</button>
   </div>}
   <h1 ref={targetRef} className='reviewHeading'>Reviews</h1>
   {product.reviews && product.reviews[0] ? <div className='reviews'>
    {product.reviews.map((item, i) => {
     return <ReviewCard detail={item} key={i} />
    })}
   </div> : <div className='noReviews'>No Reviews</div>}

  </Fragment>
 )
}

export default ProductDetails