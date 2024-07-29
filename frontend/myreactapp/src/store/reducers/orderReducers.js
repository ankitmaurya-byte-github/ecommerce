import { ORDERDETAIL_FAIL, ORDERDETAIL_REQUEST, ORDERDETAIL_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_SUCCESS, ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constant/orderConstant";
import { ADMIN_ORDERS_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS, CLEAR_ERRORS } from "../constant/productConstants";

export const ordersReducer = (state = {}, action) => {
 switch (action.type) {
  case ORDER_CREATE_REQUEST:
   return { loading: true };
  case ORDER_CREATE_SUCCESS:
   return { loading: false, success: true, ...action.payload };
  case ORDER_CREATE_FAIL:
   return { loading: false, error: action.payload }

  default:
   return state;
 }
};
export const userOrdersReducer = (state = {}, action) => {
 switch (action.type) {
  case ORDER_REQUEST:
   return { loading: true };
  case ORDER_SUCCESS:
   return { loading: false, success: true, ...action.payload };
  case ORDER_FAIL:
   return { loading: false, error: action.payload }

  default:
   return state;
 }
};
export function adminOrderReducers(state = { data: [] }, action) {
 switch (action.type) {
  case ADMIN_ORDERS_REQUEST:
   return {
    loading: true,
    ...state
   };
  case ORDER_DELETE_SUCCESS:
   return {
    loading: false,
    success: true,
    data: state.data.filter((order) => order._id !== action.payload),
   };
  case ADMIN_ORDERS_SUCCESS:
   return {
    sucess: true,
    loading: false,
    data: action.payload
   }
  case ADMIN_ORDERS_FAIL:
   return {
    loading: false,
    error: action.payload
   }
  case CLEAR_ERRORS:
   return {
    loading: false,
    error: null
   }

  default:
   return state
 }
}
export const orderDetailReducer = (state = {}, action) => {
 switch (action.type) {
  case ORDERDETAIL_REQUEST:
   return { loading: true };
  case ORDERDETAIL_SUCCESS:
   return { loading: false, success: true, ...action.payload };
  case ORDERDETAIL_FAIL:
   return { loading: false, error: action.payload }

  default:
   return state;
 }
};
