import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducers, productDetailReducer } from './reducers/productReducers';
import { userReducers } from './reducers/userReducers'
// const initialState = {
//     products: [],
//     numberOfProducts:0
// }
const reducer = combineReducers({
 products: productReducers,
 productDetail: productDetailReducer,
 userData: userReducers
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
