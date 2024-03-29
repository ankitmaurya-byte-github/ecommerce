import axios from "axios"
import {
 USER_REQUEST, USER_SUCCESS,
 USER_FAIL, LOGOUT_USER,
 USER_REGISTER_REQUEST,
 UPDATE_PROFILE_REQUEST,
 UPDATE_PROFILE_FAIL,
 UPDATE_PROFILE_SUCCESS
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
  'Content-Type': 'multipart/form-data',
 }
 try {
  dispatch({ type: UPDATE_PROFILE_REQUEST })
  const data = await axios.post(`/app/v1/profile/update`, userData, config)
  dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
 } catch (err) {
  console.log(err);
  dispatch({ type: UPDATE_PROFILE_FAIL, payload: err })
 }

}