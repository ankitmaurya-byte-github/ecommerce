import {
 USER_REQUEST, USER_SUCCESS,
 USER_FAIL, LOGOUT_USER,
} from '../constant/userConst'

function userReducers(state = { userData: {} }, action) {
 switch (action.type) {
  case USER_REQUEST:
   return {
    loading: true
   }
  case USER_SUCCESS:
   return {
    loading: false,
    ...action.payload.data.user,
    isAuthenticated: action.payload.data.isAuthenticated
   }
  case LOGOUT_USER:
   return {
    loading: false,
    user: null,
    isAuthenticated: false
   }
  case USER_FAIL:
   console.log(action.payload);
   return {
    loading: false,
    error: action.payload.response.data
   }
  default:
   return state
 }
}
export { userReducers }