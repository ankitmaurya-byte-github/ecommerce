import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartItems from './cartItemsCards/CartItems'
import style from './productCart.module.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { createContext } from 'react';
export const cartItemsContext = createContext();
const ProductCart = () => {
 const { cartItems } = useSelector(state => state.userCart)
 const [cartProducts, setCartProducts] = useState(cartItems)
 let totalPrice = 0;


 return (
  <cartItemsContext.Provider value={{ cartProducts, setCartProducts }}>
   <div className={style.cartContainer}>
    <div className={style.cartHeader}>
     <p>Product</p>
     <p>Quantity</p>
     <p>Subtotal</p>
    </div>
    <div className={style.cartItems}>
     {cartProducts.map((item, index) => {
      totalPrice += item.price * item.quantity;
      console.log(index);
      return <CartItems index={index} key={index} item={item} />
     })}

    </div>
    <div className={style.cartCheckOut}>
     <div></div>
     <div>
      <div>Total price </div>
      <div>{totalPrice}</div>
     </div>
     <div>
      <button>check out</button>
     </div>
    </div>
   </div>
  </cartItemsContext.Provider>
 )
}

export default ProductCart