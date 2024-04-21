import React from 'react'
import { Link } from 'react-router-dom'
import stylecart from './cartitems.module.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
const CartItems = ({ item }) => {
 return (
  <div className={stylecart.cartItem}>
   <div className={stylecart.details}>
    <img src={item.images[0].url} alt="" />
    <div>
     <Link to={`/product/${item.id}`}>{item.name}</Link>
     <span>{item.price}</span>
     <p>remove</p>

    </div>
   </div>
   <div className={stylecart.quantity}>
    <button>-</button>
    <input type="number" value={item.quantity} readOnly />
    <button>+</button>
   </div>

   <div className={stylecart.price}> <AttachMoneyIcon /> {item.price} </div>

  </div>
 )
}

export default CartItems