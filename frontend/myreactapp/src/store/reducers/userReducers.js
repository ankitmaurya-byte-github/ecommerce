import {
 USER_REQUEST, USER_SUCCESS,
 USER_FAIL,
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
  case USER_FAIL:
   return {
    loading: false,
    error: action.payload.response.data
   }
  default:
   return state
 }
}
export { userReducers }