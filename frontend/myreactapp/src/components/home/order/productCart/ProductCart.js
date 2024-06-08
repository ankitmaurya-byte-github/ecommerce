import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from './cartItemsCards/CartItems'
import style from './productCart.module.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useNavigate } from 'react-router-dom';
import { updateCart } from
 '../../../../store/action/cartAction';

const ProductCart = () => {
 const { cartItems } = useSelector(state => state.userCart)
 const { isAuthenticated } = useSelector(state => state.userData
 )
 const [cartProducts, setCartProducts] = useState(cartItems)
 let totalPrice = 0;
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const handelCheckout = () => {
  dispatch(updateCart(cartProducts));
  if (!isAuthenticated) {
   navigate('/login?redirect=shipping')
  }
  else {
   navigate('/shipping')
  }

 }
 console.log(cartProducts);
 function changeCartProducts(item) {

  setCartProducts(item);
 }
 useEffect(() => {
  const handleUnload = (event) => {
   event.preventDefault();
   console.log(cartProducts);
   dispatch(updateCart(cartProducts));
   console.log("cart updated");
  };

  window.addEventListener('beforeunload', handleUnload, { capture: true });

  window.removeEventListener('beforeunload', handleUnload)
  return () => {
   // dispatch(updateCart(cartProducts));
   console.log("cart update envent close");
  }
 }, [cartProducts]);
 return (
  <>
   {cartProducts.length === 0 ?
    <div className={style.emptyCart}>
     <div>
      <AttachMoneyIcon />
      <p>Your cart is empty</p>
     </div>
     <div>
      <button onClick={handelCheckout}>check out</button>
     </div>
    </div>
    :


    <div className={style.cartContainer}>
     <div className={style.cartHeader}>
      <p>Product</p>
      <p>Quantity</p>
      <p>Subtotal</p>
     </div>
     <div className={style.cartItems}>
      {cartProducts.map((item, index) => {
       totalPrice += item.price * item.quantity;
       return <CartItems details={{ cartProducts, changeCartProducts }} index={index} key={index} item={item} />
      })}

     </div>
     <div className={style.cartCheckOut}>
      <div></div>
      <div>
       <div>Total price </div>
       <div>{totalPrice}</div>
      </div>
      <div>
       <button onClick={handelCheckout}>check out</button>
      </div>
     </div>
    </div>

   }
  </>

 )
}

export default ProductCart;