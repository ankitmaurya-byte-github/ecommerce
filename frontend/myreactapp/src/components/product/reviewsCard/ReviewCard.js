import React, { useEffect } from 'react'
import image from '../../../images/0nline-trends-2022.png'
import ReactStars from "react-rating-stars-component";
function ReviewCard({ detail }) {
 const option = {
  edit: false,
  count: 5,
  size: 20,
  value: detail.rating,
  isHalf: true,
  activeColor: "#ffd700"
 }
 // useEffect(() => { 
 //    option.value = detail.rating;
 // },[detail])
 return (
  <div className="review-card">
   <div className="upper"><img src={detail.avatar ? detail.avatar : image} alt={`${detail.name}  avatar`} className="avatar" />
    <h2>{detail.name}</h2></div>
   <ReactStars {...option} key={detail.rating} />
   <p className='comment'>{detail.comment}</p>
  </div>
 )
}

export default ReviewCard