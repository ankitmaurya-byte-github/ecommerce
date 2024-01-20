import React, { Fragment } from 'react'
import style from './auth.module.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../../store/action/userAction'
import avatar from '../../images/avatar.png'

import { clearError } from '../../store/action/producAction';
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
function Auth() {
 const alert = useAlert()
 const [swipe, setSwipe] = useState("")
 const { loading, error, email, name, role, avatar } = useSelector(state => state.userData)
 const [selectedFile, setSelectedFile] = useState(null);
 const [userData, setUserData] = useState({ email: "", name: "", password: "" })
 const dispatch = useDispatch()
 const navigate = useNavigate()
 useEffect(() => {
  if (error) {
   alert.error(error)
   dispatch(clearError())
  }
  console.log(email);
  console.log(!!email === true);
  if (!!email) {
   console.log(email);
   navigate('/')
  }
 }, [dispatch, error, email, navigate])
 const handleSinIn = () => {
  console.log(userData);
  dispatch(loginUser(userData))
 }
 const handleSinUp = () => {
  dispatch(registerUser(userData))
 }
 const handleAvatarChange = (event) => {
  const file = event.target.files[0]; // Get the selected file
  setSelectedFile(file);

  if (file) {
   console.log('Selected file:', file.name);
  }
 };
 return (

  <div className={style.auth}>
   {loading ? <Loader /> :
    <div className={`${style.container} ${swipe === "sinup" ? style.rightpanelactive : ""}`} id="container">
     <div className={`${style.formcontainer} ${style.signupcontainer}`}>
      <form action="#">
       <h1>Create Account</h1>
       <input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} placeholder="Name" />
       <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder="Email" />
       <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} placeholder="Password" />
       <input type="file" onChange={handleAvatarChange} id="fileInput" name="fileInput" />
       <label htmlFor="fileInput" className={style.image}>
        <img className={style.avatar} src={selectedFile ? selectedFile : 'https://w7.pngwing.com/pngs/99/557/png-transparent-computer-icons-avatar-avatar-angle-heroes-recruiter.png'} alt="" />
        <span>Choose Avatar</span>
       </label>


       <button onClick={handleSinUp}>Sign Up</button>
      </form>
     </div>
     <div className={`${style.formcontainer} ${style.signincontainer}`}>
      <form action="#">
       <h1>Sign in</h1>
       <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder="Email" />
       <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} placeholder="Password" />
       <a href="#">Forgot your password?</a>
       <button onClick={handleSinIn}>Sign In</button>
      </form>
     </div>
     <div className={style.overlaycontainer}>
      <div className={style.overlay}>
       <div className={`${style.overlaypanel} ${style.overlayleft}`}>
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button className={style.ghost} onClick={() => setSwipe("")} id="signIn">Sign In</button>
       </div>
       <div className={`${style.overlaypanel} ${style.overlayright}`}>
        <h1>Hello, Friend!</h1>
        <p>Enter your personal details and start journey with us</p>
        <button className={style.ghost} onClick={() => setSwipe("sinup")} id="signUp">Sign Up</button>
       </div>
      </div>
     </div>
    </div>}
  </div>

 )
}

export default Auth