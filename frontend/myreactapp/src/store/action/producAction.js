import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, CLEAR_ERRORS } from "../constant/productConstants";
import axios from 'axios'
export const getProduct = (keyword = "", currentpage = 1, slideValue1 = [0, 2000], rating = 0, catogory = []) => async (dispatch) => {

 try {
  dispatch({
   type: ALL_PRODUCT_REQUEST,
  })
  let link = ""


  if (catogory.length === 0) {
   link = `/app/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${slideValue1[0]}&price[lte]=${slideValue1[1]}&ratings[gte]=${0}`

  } else {
   link = `/app/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${slideValue1[0]}&price[lte]=${slideValue1[1]}&ratings[gte]=${0}&category[in]=${catogory}`
  }
  const { data } = await axios.get(link)
  dispatch({
   type: ALL_PRODUCT_SUCCESS,
   payload: data,
  })
 } catch (err) {
  console.log(err);
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
