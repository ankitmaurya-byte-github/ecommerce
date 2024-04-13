import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducers, productDetailReducer } from './reducers/productReducers';
import { profileReducer } from './reducers/userReducers';
import { userReducers } from './reducers/userReducers'
import { cartItems } from './reducers/cartReducers';
const initialState = {
 userCart: {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
 }
}
const reducer = combineReducers({
 products: productReducers,
 productDetail: productDetailReducer,
 userData: userReducers,
 profile: profileReducer,
 userCart: cartItems
})
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store
