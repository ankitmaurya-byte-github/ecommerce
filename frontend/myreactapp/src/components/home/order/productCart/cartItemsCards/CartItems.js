import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import stylecart from './cartitems.module.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { useContext } from 'react';
import { cartItemsContext } from '../ProductCart';
const CartItems = ({ index, item }) => {
 const { cartProducts, setCartProducts } = useContext(cartItemsContext);

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
    <button onClick={() => {
     if (item.quantity > 1) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[index].quantity--;
      setCartProducts(updatedCartProducts);
     }
    }}>-</button>
    <input type="text" value={item.quantity} readOnly />
    <button onClick={() => {
     if (item.quantity < item.stock) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[index].quantity++;
      setCartProducts(updatedCartProducts);
     }
    }}>+</button>
   </div>

   <div className={stylecart.price}> <AttachMoneyIcon /> {item.price * item.quantity}</div>

  </div>
 )
}

export default CartItems