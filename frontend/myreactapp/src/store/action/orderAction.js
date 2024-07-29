import axios from "axios"
import { ORDERDETAIL_FAIL, ORDERDETAIL_REQUEST, ORDERDETAIL_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_SUCCESS, ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constant/orderConstant";
import { ADMIN_ORDERS_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS } from "../constant/productConstants";


export const orderAction = (orderData) => async (dispatch) => {
 try {
  dispatch({
   type: ORDER_CREATE_REQUEST,
  })
  const { data } = await axios.post("/app/v1/order/create", orderData)
  console.log(data);
  dispatch({
   type: ORDER_CREATE_SUCCESS,
   payload: data,
  })
 } catch (err) {
  dispatch({ type: ORDER_CREATE_FAIL, payload: err });
 }

}
export const deleteOrder = (orderData) => async (dispatch) => {
 try {
  dispatch({
   type: ADMIN_ORDERS_REQUEST,
  })
  console.log(orderData);
  await axios.delete(`/app/v1/order/${orderData}`)
  dispatch({
   type: ORDER_DELETE_SUCCESS,
   payload: orderData,
  })
 } catch (err) {
  dispatch({ type: ORDER_CREATE_FAIL, payload: err });
 }

}
export const getAdminOrders = () => async (dispatch) => {
 try {
  dispatch({
   type: ADMIN_ORDERS_REQUEST,
  })
  const { data } = await axios.get('/app/v1/admin/orders')
  console.log(data.orders);
  dispatch({
   type: ADMIN_ORDERS_SUCCESS,
   payload: data.orders
  })

 } catch (err) {
  console.log(err);
  dispatch({
   type: ADMIN_ORDERS_FAIL,
   payload: err
  })
 }

}
export const userOrderAction = (orderData) => async (dispatch) => {
 try {
  dispatch({
   type: ORDER_REQUEST,
  });
  const { data } = await axios.get("/app/v1/order/me");
  console.log(data);
  dispatch({
   type: ORDER_SUCCESS,
   payload: data,
  });
 } catch (err) {
  dispatch({ type: ORDER_FAIL, payload: err });
 }

}
export const oderDetailAction = (orderID) => async (dispatch) => {
 try {
  dispatch({
   type: ORDERDETAIL_REQUEST,
  });
  const { data } = await axios.get(`/app/v1/order/${orderID}`);
  console.log(data);
  dispatch({
   type: ORDERDETAIL_SUCCESS,
   payload: data,
  });
 } catch (err) {
  dispatch({ type: ORDERDETAIL_FAIL, payload: err });
 }
};
