import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, CLEAR_ERRORS } from "../constant/productConstants";
function productReducers(state = { products: [] }, action) {
 switch (action.type) {
  case ALL_PRODUCT_REQUEST:
   return {
    loading: true,
    ...state
   };
  case ALL_PRODUCT_SUCCESS:
   return {
    loading: false,
    products: action.payload.product,
    totalDoc: action.payload.totaldoc,
    dataPerPage: action.payload.dataPerPage,
    filterProductCount: action.payload.filterProductCount
   }
  case ALL_PRODUCT_FAIL:
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
function productDetailReducer(state = { product: {} }, action) {
 switch (action.type) {
  case PRODUCT_DETAIL_REQUEST:
   return {
    loading: true,
    ...state
   };
  case PRODUCT_DETAIL_SUCCESS:
   return {
    loading: false,
    product: action.payload.data,
   }
  case PRODUCT_DETAIL_FAIL:
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

export { productReducers, productDetailReducer }