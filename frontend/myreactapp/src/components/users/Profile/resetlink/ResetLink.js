import React, { useEffect } from "react";
import style from "./resetPassword.module.scss";
import axios from "axios";
import { sendResetPasswordLink } from "../../../../store/action/userAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "../../../layout/loader/Loader2";
import { useAlert } from "react-alert";
const ResetLink = () => {
 const [email, setEmail] = React.useState("");
 const dispatch = useDispatch()
 const { error, success, loading } = useSelector((state) => state.profile)
 const handleEmailChange = (event) => {
  setEmail(event.target.value);
 };
 const alert = useAlert();
 const handleSubmit = async (event) => {
  event.preventDefault();
  // add email validation here
  dispatch(sendResetPasswordLink({ email: email }))
  // await axios.post(`/app/v1/password/update`, { email })
  // send reset password email here
 };
 useEffect(() => {
  if (error) {
   alert.error(error.message);
  }
 }, [error]);
 return (
  <>
   {loading && <Loader />}
   <form className={style.form} onSubmit={handleSubmit}>
    <label className={style.label}>
     Email:
     <input className={style.input} type="email" placeholder="enter email" value={email} onChange={handleEmailChange} />
    </label>
    {success && <p style={{ margin: 0 }}>{`A reset link is sent to ${email}`}</p>}
    <button type="submit">Reset Password</button>
   </form>
  </>
 );
};

export default ResetLink;
