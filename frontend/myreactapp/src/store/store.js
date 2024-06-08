import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducers, productDetailReducer, newReviewReducers, adminProductReducers, newProductReducers } from './reducers/productReducers';
import { profileReducer, usersreducers } from './reducers/userReducers';
import { userReducers } from './reducers/userReducers'
import { cartItems } from './reducers/cartReducers';
import { adminOrderReducers, orderDetailReducer, ordersReducer, userOrdersReducer } from './reducers/orderReducers';
import UserOrders from '../components/home/order/userOrders';
const initialState = {
 userCart: {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  shipingData: localStorage.getItem('shipingData') ? JSON.parse(localStorage.getItem('shipingData')) : {}
 }

}
const reducer = combineReducers({
 products: productReducers,
 productDetail: productDetailReducer,
 userData: userReducers,
 profile: profileReducer,
 userCart: cartItems,
 userOrders: userOrdersReducer,
 newOrder: ordersReducer,
 orderDetail: orderDetailReducer,
 userReview: newReviewReducers,
 allusers: usersreducers,
 adminProducts: adminProductReducers,
 adminOrders: adminOrderReducers,
 newProduct: newProductReducers,
})
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store
