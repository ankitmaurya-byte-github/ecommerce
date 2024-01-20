import axios from "axios"
import {
 USER_REQUEST, USER_SUCCESS,
 USER_FAIL,
 USER_REGISTER_REQUEST
} from '../constant/userConst'
export const loginUser = (userData) => async (dispatch) => {
 const config = {
  'Content-Type': 'application/json',
 }
 try {

  dispatch({ type: USER_REQUEST })
  const user = await axios.post(`/app/v1/login`, userData, config)
  console.log(user);
  dispatch({ type: USER_SUCCESS, payload: user })

 } catch (err) {
  console.log(err);
  dispatch({ type: USER_FAIL, payload: err })

 }

}
export const registerUser = (userData) => async (dispatch) => {
 const config = {
  'Content-Type': 'application/json',
 }
 try {
  dispatch({ type: USER_REQUEST })
  const user = await axios.post(`/app/v1/register`, userData, config)
  console.log(user);
  dispatch({ type: USER_SUCCESS, payload: user })
 } catch (err) {
  console.log(err);
  dispatch({ type: USER_FAIL, payload: err })

 }

}