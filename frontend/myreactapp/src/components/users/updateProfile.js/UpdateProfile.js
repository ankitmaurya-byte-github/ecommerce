import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import fallbackimg from '../../../images/avatar.png'
import { Navigate, useNavigate } from 'react-router-dom';
import { FiCamera } from "react-icons/fi";
import { profileUpdate } from '../../../store/action/userAction'
import style from './UpdateProfile.module.scss'
import Loader from '../../layout/loader/Loader2';
function UpdateProfile() {
 const dispatch = useDispatch()
 const alert = useAlert()
 const navigate = useNavigate();
 const { name, avatar, loading, email } = useSelector(state => state.userData)
 // const profile = useSelector(state => state.profile)

 const [navigationToProfile, setNavigationToProfile] = useState(false)
 const [userData, setUserData] = useState({ name: "", avatar: null, email: "" })
 const [avatarPreview, setPreviewAvatar] = useState(avatar.post_url)



 const updateProfileAvatar = (e) => {
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
 }
 const handletProfileUpdate = async (e) => {
  console.log(userData);
  const formdata = new FormData();
  // formdata.append('username', 'john_doe');
  Object.entries(userData).forEach(([key, value]) => {
   formdata.append(key, value)
  });
  dispatch(profileUpdate(userData))
  setNavigationToProfile(true)
 }
 // console.log("");
 useEffect(() => {
  // if (navigationToProfile) {
  //   setNavigationToProfile(false) 
  //   alert.show("profile updated succesfully")
  //  navigate('/profile')
  // }

  // const { name, avatar, email } = useSelector(state => state.userData)

  console.log("useeffect runed")
  // const { uuname, avatar, email } = useSelector(state => state.userData)
  // console.log(profile);

  setUserData({ name, avatar, email })
  setPreviewAvatar(avatar.post_url ? avatar.post_url : fallbackimg)


 }, [avatar, name, email])
 return (
  <>
   {loading && <Loader />}
   <div className={style.userDetail}>
    <h2>Update Your Profile</h2>
    <label className={style.avatar} htmlFor="inputField"><img src={avatarPreview} alt="" /><FiCamera style={{ fontSize: "50px", fontWeight: "100" }} className={style.camera} /></label>

    <input style={{ display: "none" }} type="file" id="inputField" onChange={updateProfileAvatar} name="inputField" />

    <div>
     <input type="text" onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} placeholder='Enter you name' />
     <input type="text" onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} placeholder='Enter you email' />
    </div>

    <div onClick={handletProfileUpdate} className={style.updateButton}>
     update
    </div>
    <div onClick={() => navigate("/profile")} className={style.updateButton}>
     Profile
    </div>
   </div>

  </>
 )
}

export default UpdateProfile