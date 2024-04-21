import React from 'react'
import { useSelector } from 'react-redux'
import CartItems from './cartItemsCards/CartItems'
import style from './productCart.module.scss'
const ProductCart = () => {
 const { cartItems } = useSelector(state => state.userCart)
 return (
  <div className={style.cartContainer}>
   <div className={style.cartHeader}>
    <p>Product</p>
    <p>Quantity</p>
    <p>Subtotal</p>
   </div>
   <div className={style.cartItems}>
    {cartItems.map((item, index) => (
     <CartItems key={index} item={item} />
    ))}
    {cartItems.map((item, index) => (
     <CartItems key={index} item={item} />
    ))}
   </div>
  </div>
 )
}

export default ProductCart