import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, CLEAR_ERRORS } from "../constant/productConstants";
import axios from 'axios'
export const getProduct = (keyword = "", currentpage = 1) => async (dispatch) => {
 try {
  dispatch({
   type: ALL_PRODUCT_REQUEST,
  })
  const getdata = await axios.get(`/app/v1/products?keyword=${keyword}&page=${currentpage}`)
  const { data } = getdata
  dispatch({
   type: ALL_PRODUCT_SUCCESS,
   payload: data,

  })
 } catch (err) {
  dispatch({
   type: ALL_PRODUCT_FAIL,
   payload: err
  })
 }
}
export const getProductDetail = (id) => async (dispatch) => {
 try {
  dispatch({
   type: PRODUCT_DETAIL_REQUEST,
  })

  const { data } = await axios.get(`/app/v1/products/${id}`)
  console.log(data);
  dispatch({
   type: PRODUCT_DETAIL_SUCCESS,
   payload: data
  })
 } catch (err) {
  console.log(err);
  dispatch({
   type: PRODUCT_DETAIL_FAIL,
   payload: err
  })
 }
}
export const clearError = () => (dispatch) => {
 dispatch({
  type: CLEAR_ERRORS,
 })
}
