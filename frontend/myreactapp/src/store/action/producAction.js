import { useParams } from "react-router-dom";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, CLEAR_ERRORS, REMOVE_PRODUCT_DETAIL_SUCCESS, ADD_PRODUCT_DETAIL_REQUEST, ADD_PRODUCT_DETAIL_SUCCESS, ADD_PRODUCT_DETAIL_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS, ADMIN_ORDERS_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL } from "../constant/productConstants";
import axios from 'axios'
export const getProduct = (keyword = "", currentpage = 1, slideValue1 = [0, 2000], rating = 0, catogory = []) => async (dispatch) => {

 try {
  dispatch({
   type: ALL_PRODUCT_REQUEST,
  })
  let link = ""


  if (catogory.length === 0) {
   link = `/app/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${slideValue1[0]}&price[lte]=${slideValue1[1]}&ratings[gte]=${rating}`

  } else {
   link = `/app/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${slideValue1[0]}&price[lte]=${slideValue1[1]}&ratings[gte]=${rating}&category[in]=${catogory}`
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
  const { data } = await axios.get(`/app/v1/product/${id}`)
  dispatch({
   type: PRODUCT_DETAIL_SUCCESS,
   payload: data
  })
 } catch (err) {
  console.log("this is error loging");
  console.log(err);
  dispatch({
   type: PRODUCT_DETAIL_FAIL,
   payload: err
  })
 }
}
export const getAdminProduct = () => async (dispatch) => {
 try {
  dispatch({
   type: ADMIN_PRODUCT_REQUEST,
  })
  const { data } = await axios.get('/app/v1/admin/products')

  dispatch({
   type: ADMIN_PRODUCT_SUCCESS,
   payload: data
  })

 } catch (err) {
  console.log(err);
  dispatch({
   type: ADMIN_PRODUCT_FAIL,
   payload: err
  })
 }

}
export const createProduct = (formData) => async (dispatch) => {
 try {
  dispatch({
   type: CREATE_PRODUCT_REQUEST,
  })
  console.log("this is actuon");
  const { data } = await axios.post("/app/v1/products/new", formData,
   {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   }
  );
  console.log("this is actuon emnd");
  dispatch({
   type: CREATE_PRODUCT_SUCCESS,
   payload: data
  })

 } catch (err) {
  console.log(err);
  dispatch({
   type: CREATE_PRODUCT_FAIL,
   payload: err
  })
 }

}
export const updateproduct = (updatedData) => async (dispatch) => {

 try {
  dispatch({
   type: CREATE_PRODUCT_REQUEST,
  })
  console.log("this is actuon");
  const { data } = await axios.put(`/app/v1/product/${updatedData.id}`, updatedData.formData,
   {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   }
  );
  console.log("this is actuon emnd");
  dispatch({
   type: CREATE_PRODUCT_SUCCESS,
   payload: data
  })

 } catch (err) {
  console.log(err);
  dispatch({
   type: CREATE_PRODUCT_FAIL,
   payload: err
  })
 }

}
export const deleteProduct = (id) => async (dispatch) => {
 try {
  dispatch({
   type: ADMIN_PRODUCT_REQUEST,
  })
  console.log("this is actuon");
  const { data } = await axios.delete(`/app/v1/product/${id}`);
  console.log("this is actuon emnd");
  dispatch({
   type: DELETE_PRODUCT_SUCCESS,
   payload: { ...data, id }
  })

 } catch (err) {
  console.log(err);
  dispatch({
   type: ADMIN_PRODUCT_FAIL,
   payload: err
  })
 }

}

export const clearProductDetail = () => async (dispatch) => {
 try {
  dispatch({ type: REMOVE_PRODUCT_DETAIL_SUCCESS });
 } catch (err) {
  console.log(err);
 }
}
export const addNewReviewAction = (newReviewData) => async (dispatch) => {
 try {
  dispatch({ type: ADD_PRODUCT_DETAIL_REQUEST });
  const { data } = await axios.put("/app/v1/product/review", newReviewData);
  console.log(data);
  dispatch({ type: ADD_PRODUCT_DETAIL_SUCCESS, payload: data });
 } catch (err) {
  console.log(err);
  dispatch({
   type: ADD_PRODUCT_DETAIL_FAIL,
   payload: err
  })
 }
}
export const clearError = () => (dispatch) => {
 dispatch({
  type: CLEAR_ERRORS,
 })
}


