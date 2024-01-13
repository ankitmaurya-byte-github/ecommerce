import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
const ratingChanged = (newRating) => {
 console.log(newRating);
};
function ProductCards({ product }) {

 const option = {
  edit: false,
  count: 5,
  onChang: ratingChanged,
  size: 20,
  value: product.ratings,
  isHalf: true,
  activeColor: "#ffd700"
 }

 return (
  <Link to={`/product/${product._id}`}>
   <img src={product.images[0].url} alt="" />
   <p>{product.name}</p>
   <div>
    <ReactStars {...option} />
    <span>{product.numOfReviews} reviews</span>
   </div>
   <span>RS.{product.price}</span>
  </Link>

 )
}

export default ProductCards