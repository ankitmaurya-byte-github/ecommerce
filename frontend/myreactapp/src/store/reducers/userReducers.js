import {
 USER_REQUEST, USER_SUCCESS,
 USER_FAIL, LOGOUT_USER,
 UPDATE_PROFILE_REQUEST,
 UPDATE_PROFILE_FAIL,
 UPDATE_PROFILE_SUCCESS
} from '../constant/userConst'

function userReducers(state = { initialUserData: {} }, action) {
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
  case UPDATE_PROFILE_REQUEST:

   return {
    ...state,
    loading: true
   }
  case UPDATE_PROFILE_SUCCESS:
   return {
    ...state,
    loading: false,
    isUpdated: action.payload.data.success,
    ...action.payload.data.user,
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
function profileReducer(state = { initialProfileData: {} }, action) {
 switch (action.type) {
  case "UPDATE_PROFILE_REQUESTK":

   return {
    // ...state,
    loading: true
   }
  case "UPDATE_PROFILE_SUCCESSL":
   return {
    // ...state,
    loading: false,
    isUpdated: action.payload.data.success,
    ...action.payload.data.user,
   }

  case UPDATE_PROFILE_FAIL:
   console.log(action.payload);
   return {
    // ...state,
    loading: false,
    error: action.payload.response.data
   }
  default:
   return state
 }
}
export { userReducers, profileReducer }