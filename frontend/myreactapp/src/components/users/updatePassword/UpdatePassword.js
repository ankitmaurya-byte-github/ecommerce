import React, { useEffect, useState } from 'react'
import styles from './updatePassword.module.scss'
import { useDispatch } from 'react-redux';
import { passwordUpdate, clearProfile } from '../../../store/action/userAction';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../layout/loader/Loader2';
const UpdatePassword = () => {
 const { error, isUpdated, loading } = useSelector((state) => state.profile);
 const [passwordData, serPasswrodData] = useState({ currentPassword: "", password: "", confirmPassword: "" })
 const alert = useAlert()
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const handleSubmit = (e) => {
  e.preventDefault()

  if (e.target[1].value !== e.target[2].value) {
   alert.error("confirmPassword doesnt match")
   return
  }
  dispatch(passwordUpdate(passwordData))
 }

 useEffect(() => {
  if (error) {
   alert.error(error.message)
  }
  if (isUpdated) {
   alert.success("Password is updated")
   dispatch(clearProfile())
   navigate('/profile')
  }
 }, [alert, isUpdated, error, dispatch])


 return (
  <>
   {loading && <Loader />}
   <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles['register-form']}> {/* Use CSS Module */}
     <input value={passwordData.currentPassword} onChange={(e) => {
      serPasswrodData({
       ...passwordData,
       currentPassword: e.target.value
      })
     }} type="text" placeholder="current password" />
     <input value={passwordData.password} onChange={(e) => {
      serPasswrodData({
       ...passwordData,
       password: e.target.value
      })
     }} type="text" placeholder="password" />
     <input value={passwordData.confirmPassword} onChange={(e) => {
      serPasswrodData({
       ...passwordData,
       confirmPassword: e.target.value
      })
     }} type="text" placeholder="confirm password" />
     <button type='submit'>Update</button>
     {/* <p className={styles.message}>Already registered? <a href="#">Sign In</a></p> Use CSS Module */}

    </form>
   </div>

  </>

 )
}

export default UpdatePassword
