import axios from "axios"
import {
 USER_REQUEST, USER_SUCCESS,
 USER_FAIL, LOGOUT_USER,
 USER_REGISTER_REQUEST,
 UPDATE_PROFILE_REQUEST,
 UPDATE_PROFILE_FAIL,
 UPDATE_PROFILE_SUCCESS,
 UPDATE_PASSWORD_REQUEST,
 UPDATE_PASSWORD_FAIL,
 UPDATE_PASSWORD_SUCCESS,
 PASSWORD_RESET_REQUEST,
 PASSWORD_RESET_SUCCESS,
 PASSWORD_RESET_FAIL,
 RESETTOKEN_VALIDITY_REQUEST,
 RESETTOKEN_VALIDITY_SUCCESS,
 RESETTOKEN_VALIDITY_FAIL,
 REMOVE_PROFILE_DATA_SUCCESS,
} from '../constant/userConst'
// import multer from 'multer'
export const loginUser = (userData) => async (dispatch) => {
 const config = {
  'Content-Type': 'application/json',
 }
 try {

  dispatch({ type: USER_REQUEST })
  const user = await axios.post(`/app/v1/login`, userData, config)

  dispatch({ type: USER_SUCCESS, payload: user })

 } catch (err) {
  console.log(err);
  dispatch({ type: USER_FAIL, payload: err })

 }

}
export const loadUser = () => async (dispatch) => {

 try {

  dispatch({ type: USER_REQUEST })
  const user = await axios.get(`/app/v1/me`)
  console.log(user);
  dispatch({ type: USER_SUCCESS, payload: user })

 } catch (err) {
  console.log(err);
  dispatch({ type: USER_FAIL, payload: err })

 }

}
export const loadIfAuthenticated = (token) => async (dispatch) => {
 try {
  dispatch({ type: RESETTOKEN_VALIDITY_REQUEST });
  console.log(token);
  const validity = await axios.post(`/app/v1/token/valid`, { ...token })
  console.log(validity);
  dispatch({ type: RESETTOKEN_VALIDITY_SUCCESS, payload: validity })

 } catch (err) {
  console.log(err);
  dispatch({ type: RESETTOKEN_VALIDITY_FAIL, payload: err })
 }
}
export const registerUser = (userData) => async (dispatch) => {
 const config = {
  'Content-Type': 'multipart/form-data',
 }
 try {
  dispatch({ type: USER_REQUEST })
  console.log(userData);
  // const storage = multer.memoryStorage();
  // const upload = multer({ storage: storage });
  // const formData = new FormData();
  // formData.append('file', userData.avatar);
  const user = await axios.post(`/app/v1/register`, userData, config)
  console.log(user);
  dispatch({ type: USER_SUCCESS, payload: user })
 } catch (err) {
  console.log(err);
  dispatch({ type: USER_FAIL, payload: err })

 }

}
export const logoutUser = () => async (dispatch) => {
 try {
  dispatch({ type: USER_REQUEST })
  await axios.post(`/app/v1/logout`)
  dispatch({ type: LOGOUT_USER })
 } catch (err) {
  console.log(err);
  dispatch({ type: USER_FAIL, payload: err })
 }

}

export const profileUpdate = (userData) => async (dispatch) => {
 const config = {
  "Content-Type": "multipart/form-data",
 }
 try {

  dispatch({ type: UPDATE_PROFILE_REQUEST })
  const data = await axios.post(`/app/v1/profile/update`, userData, config)
  console.log(data);
  dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
  console.log("updated");
 } catch (err) {
  console.log(err);
  dispatch({ type: UPDATE_PROFILE_FAIL, payload: err })
 }

}

export const passwordUpdate = (passwordData) => async (dispatch) => {
 const config = {
  'Content-Type': 'multipart/form-data',
 }
 try {
  dispatch({ type: UPDATE_PASSWORD_REQUEST })
  console.log(passwordData);
  const data = await axios.post(`/app/v1/password/update`, passwordData, config)
  console.log(data);
  dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data })
  console.log("updated");
 } catch (err) {
  console.log(err);
  dispatch({ type: UPDATE_PASSWORD_FAIL, payload: err })
 }

}
export const clearProfile = () => async (dispatch) => {
 try {
  dispatch({ type: REMOVE_PROFILE_DATA_SUCCESS });
 } catch (err) {
  console.log(err);
 }
}
export const sendResetPasswordLink = (email) => async (dispatch) => {
 try {
  dispatch({ type: PASSWORD_RESET_REQUEST });

  const data = await axios.post(`/app/v1/password/forgot`, email);
  dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data });

 } catch (error) {
  console.log(error);
  dispatch({ type: PASSWORD_RESET_FAIL, payload: error });
 }
};
