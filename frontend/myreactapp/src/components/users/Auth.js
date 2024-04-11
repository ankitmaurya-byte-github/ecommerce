import React, { Fragment } from 'react'
import style from './auth.module.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../../store/action/userAction'
import defaultAvatar from '../../images/avatar.png'
import { clearError } from '../../store/action/producAction';
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
function Auth() {
 const alert = useAlert()
 const [swipe, setSwipe] = useState("")
 const [navigateToHome, setNavigateToHome] = useState(false)
 const { loading, error, isAuthenticated, email, name, role, avatar } = useSelector(state => state.userData)
 const [previewAvatar, setPreviewAvatar] = useState(defaultAvatar)
 const [image, setimage] = useState('../../images/avatar.png')
 const [userData, setUserData] = useState({ email: "", name: "", password: "", avatar: defaultAvatar })
 const dispatch = useDispatch()
 const navigate = useNavigate()
 useEffect(() => {
  if (error) {
   if (error.message !== 'please login') {
    alert.error(error.message)
   }
   dispatch(clearError())
  }
  if (navigateToHome && isAuthenticated) {
   setNavigateToHome(false)
   console.log("fghfghf");
   navigate('/')
  }

 }, [dispatch, navigateToHome, error, alert, email, navigate])

 const handleSinIn = () => {
  console.log(userData);
  dispatch(loginUser(userData))
  setNavigateToHome(true)

 }
 const handleSinUp = () => {
  const formData = new FormData()
  formData.append('avatar', userData.avatar)
  formData.append('name', userData.name)
  formData.append('email', userData.email)
  formData.append('password', userData.password)
  // const fileUrl = URL.createObjectURL(userData.avatar);
  console.log(userData);
  // dispatch(registerUser({ ...userData, avatar: fileUrl }))
  dispatch(registerUser(formData))
  setNavigateToHome(true)
 }
 const handleAvatarChange = async (e) => {
  const reader = new FileReader();
  reader.onload = () => {
   if (reader.readyState === 2) {
    setUserData({ ...userData, avatar: reader.result });
   }
  };

  reader.readAsDataURL(e.target.files[0]);
  // setUserData({ ...userData, avatar: e.target.files[0] });
  const file = URL.createObjectURL(e.target.files[0])

  setPreviewAvatar(file)
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
        <img className={style.avatar} src={previewAvatar} alt="" />
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
       <a href="/password/reset">Forgot your password?</a>
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