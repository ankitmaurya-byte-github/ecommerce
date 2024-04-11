import React, { useEffect, useState } from "react";

import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import styles from "./resetpassword.module.scss";
import { clearProfile, loadIfAuthenticated, passwordUpdate } from "../../../../store/action/userAction";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import Loader from "../../../layout/loader/Loader2";
/**
 * Renders a form for resetting a user's password.
 *
 * The form includes fields for entering a new password and confirming the new password.
 * The form also includes a button to submit the password reset request.
 *
 * The component uses Redux to dispatch the `passwordUpdate` action to update the user's password.
 * It also uses the `useAlert` hook from the `react-alert` library to display any error messages.
 *
 * The component also includes functionality to toggle the visibility of the password fields.
 */
const ResetPassword = () => {
 const { error, isUpdated, loading, userId } = useSelector((state) => state.profile);
 const { token } = useParams();
 const [newPasswordShown, setNewPasswordShown] = useState(false);
 const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
 const dispatch = useDispatch();
 const [newPassword, setNewPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const alert = useAlert();
 const navigate = useNavigate();
 const handleNewPasswordChange = (event) => {
  setNewPassword(event.target.value);
 };

 const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value);
 };

 const toggleNewPasswordVisibility = () => {
  setNewPasswordShown(!newPasswordShown);
 };

 const toggleConfirmPasswordVisibility = () => {
  setConfirmPasswordShown(!confirmPasswordShown);
 };


 useEffect(() => {

  dispatch(loadIfAuthenticated({ token }));
 }, [])
 useEffect(() => {

  if (error) {
   alert.error(error.message);
   dispatch(clearProfile())
   navigate('/login');
  }
  if (isUpdated) {
   navigate('/profile')
  }
  console.log(token);
 }, [loading]);


 const handleSubmit = (event) => {
  event.preventDefault();
  if (newPassword !== confirmPassword) {
   alert.error("Passwords do not match");
   return;
  }
  dispatch(
   passwordUpdate({
    password: newPassword,
    directUpdate: true,
    userId
   })
  );
 };

 return (
  <>
   {loading && <Loader />}
   <form className={styles.form} onSubmit={handleSubmit}>
    <label className={styles.label}>
     New Password:
     <input
      className={styles.input}
      type={newPasswordShown ? "text" : "password"}
      value={newPassword}
      onChange={handleNewPasswordChange}
     />
     <FaEye className={styles.icon} onClick={toggleNewPasswordVisibility} />
    </label>

    <label className={styles.label}>
     Confirm Password:
     <input
      className={styles.input}
      type={confirmPasswordShown ? "text" : "password"}
      value={confirmPassword}
      onChange={handleConfirmPasswordChange}
     />
     <FaEye
      className={styles.icon}
      onClick={toggleConfirmPasswordVisibility}
     />
    </label>

    <button className={styles.button} type="submit">
     Reset Password
    </button>
   </form>
  </>
 );
};

export default ResetPassword;
