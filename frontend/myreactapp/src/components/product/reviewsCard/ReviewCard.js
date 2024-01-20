import React from 'react'
import image from '../../../images/0nline-trends-2022.png'
import ReactStars from "react-rating-stars-component";
function ReviewCard({ detail }) {
 const option = {
  count: 5,
  size: 20,
  value: detail.rating || 0,
  isHalf: true,
  activeColor: "#ffd700"
 }

 return (
  <div className="review-card">
   <div className="upper"><img src={detail.avatar ? detail.avatar : image} alt={`${detail.name}  avatar`} className="avatar" />
    <h2>{detail.name}</h2></div>

   <ReactStars {...option} />
   <p className='comment'>{detail.comment}</p>
  </div>
 )
}

export default ReviewCard