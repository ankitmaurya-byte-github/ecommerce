import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, CLEAR_ERRORS, REMOVE_PRODUCT_DETAIL_SUCCESS, ADD_PRODUCT_DETAIL_SUCCESS, ADD_PRODUCT_DETAIL_REQUEST, ADD_PRODUCT_DETAIL_FAIL, ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_REQUEST, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, DELETE_PRODUCT_SUCCESS } from "../constant/productConstants";
function productReducers(state = { data: [] }, action) {
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
    error: { message: "yeh mera error hai " }
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
function adminProductReducers(state = { data: [] }, action) {
 switch (action.type) {
  case ADMIN_PRODUCT_REQUEST:
   return {
    loading: true,
    ...state
   };
  case ADMIN_PRODUCT_SUCCESS:
   return {
    loading: false,
    ...action.payload
   }
  case DELETE_PRODUCT_SUCCESS:

   return {
    loading: false,
    success: action.payload.success,
    data: state.data.filter((item) => item._id !== action.payload.id),
   };
  case ADMIN_PRODUCT_FAIL:
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
   console.log(action.payload);
   return {
    ...state,
    loading: false,
    error: action.payload.response.data
   }
  case REMOVE_PRODUCT_DETAIL_SUCCESS:
   return {
    product: {}
   }
  case CLEAR_ERRORS:
   return {
    ...state,
    loading: false,
    error: null
   }

  default:
   return state
 }
}
function newReviewReducers(state = {}, action) {
 switch (action.type) {
  case ADD_PRODUCT_DETAIL_REQUEST:
   return {
    loading: true,
    rating: state.rating
   };
  case ADD_PRODUCT_DETAIL_SUCCESS:
   return {
    loading: false,
    ...action.payload,
   }
  case ADD_PRODUCT_DETAIL_FAIL:
   return {
    loading: false,
    ...action.payload,
   }

  default:
   return state
 }
}
function newProductReducers(state = { data: {} }, action) {
 switch (action.type) {
  case CREATE_PRODUCT_REQUEST:
   return {
    ...state,
    loading: true,
   };
  case CREATE_PRODUCT_SUCCESS:
   return {
    loading: false,
    ...action.payload,
   }
  case CREATE_PRODUCT_FAIL:
   return {
    loading: false,
    ...action.payload,
   }

  default:
   return state
 }
}

export { productReducers, newProductReducers, adminProductReducers, newReviewReducers, productDetailReducer }