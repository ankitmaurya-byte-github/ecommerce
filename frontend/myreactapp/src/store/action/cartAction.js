import axios from 'axios'
import { ADD_TO_CART } from '../constant/productConstants'

export const addProductToCart = (product) => async (dispatch, getState) => {

 dispatch({ type: ADD_TO_CART, payload: product })
 localStorage.setItem('cartItems', JSON.stringify(getState().userCart.cartItems));
}