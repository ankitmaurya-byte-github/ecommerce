import {
 USER_REQUEST, USER_SUCCESS,
 USER_FAIL, LOGOUT_USER,
 UPDATE_PROFILE_REQUEST,
 UPDATE_PROFILE_FAIL,
 UPDATE_PROFILE_SUCCESS,
 UPDATE_PASSWORD_REQUEST,
 UPDATE_PASSWORD_FAIL,
 UPDATE_PASSWORD_SUCCESS,
 REMOVE_PROFILE_DATA_SUCCESS,
 PASSWORD_RESET_REQUEST,
 PASSWORD_RESET_SUCCESS,
 PASSWORD_RESET_FAIL,
 RESETTOKEN_VALIDITY_REQUEST,
 RESETTOKEN_VALIDITY_FAIL,
 RESETTOKEN_VALIDITY_SUCCESS,
 ALL_USER_REQUEST,
 ALL_USER_SUCCESS,
 ALL_USER_FAIL
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
  case UPDATE_PASSWORD_REQUEST:
  case PASSWORD_RESET_REQUEST:
  case RESETTOKEN_VALIDITY_REQUEST:
   return {
    // ...state,
    loading: true
   }
  case PASSWORD_RESET_SUCCESS:
  case RESETTOKEN_VALIDITY_SUCCESS:
   return {
    success: true,
    loading: false,
    ...action.payload.data
   }
  case UPDATE_PASSWORD_SUCCESS:
   return {
    // ...state,
    loading: false,
    isUpdated: action.payload.data.success,
    ...action.payload.data.user,
   }
  case REMOVE_PROFILE_DATA_SUCCESS:
   return {

   }
  case UPDATE_PASSWORD_FAIL:
  case PASSWORD_RESET_FAIL:
  case RESETTOKEN_VALIDITY_FAIL:
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
function usersreducers(state = { allUser: [] }, action) {
 switch (action.type) {
  case ALL_USER_REQUEST:
   return {
    ...state,
    loading: true,
   }
  case ALL_USER_SUCCESS:
   return {
    loading: false,
    ...action.payload.data
   }
  case ALL_USER_FAIL:
   return {
    ...state,
    loading: false
   }

  default:
   return state
 }
}
export { userReducers, usersreducers, profileReducer }