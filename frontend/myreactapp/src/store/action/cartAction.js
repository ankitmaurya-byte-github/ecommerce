import axios from 'axios'
import { ADD_TO_CART, UPDATE_CART, UPDATE_SHIPPING } from '../constant/productConstants'

export const addProductToCart = (product) => async (dispatch, getState) => {

 dispatch({ type: ADD_TO_CART, payload: product })
 localStorage.setItem('cartItems', JSON.stringify(getState().userCart.cartItems));
}
export const updateCart = (products) => async (dispatch, getState) => {
 console.log("this is action");
 dispatch({ type: UPDATE_CART, payload: products })
 localStorage.setItem('cartItems', JSON.stringify(getState().userCart.cartItems));
}
export const shipingAction = (shipingData) => async (dispatch, getState) => {
 console.log("this is action");
 dispatch({ type: UPDATE_SHIPPING, payload: shipingData })
 localStorage.setItem('shipingData', JSON.stringify(getState().userCart.shipingData));
}