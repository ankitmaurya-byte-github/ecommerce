import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { profileUpdate } from '../../../store/action/userAction'
import style from './UpdateProfile.module.scss'
function UpdateProfile() {
 const dispatch = useDispatch()
 const alert = useAlert()
 const { name, avatar, email } = useSelector(state => state.userData)
 const { isUpdated, loading } = useSelector(state => state.profile)
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
  const formdata = new FormData();
  // formdata.append('username', 'john_doe');
  Object.entries(userData).forEach(([key, value]) => {
   formdata.append(key, value)
  });
  dispatch(profileUpdate(userData))
 }

 useEffect(() => {
  setUserData({ ...userData, name, avatar, email })
 }, [])
 return (
  <div className={style.userDetail}>
   <h2>Update Your Profile</h2>
   <img src={userData.avatar?.post_url} alt="" />
   <div>
    <input type="text" onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} placeholder='Enter you name' />
    <input type="text" onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} placeholder='Enter you email' />
   </div>
   <div onClick={handletProfileUpdate} className={style.updateButton}>
    update
   </div>
  </div>
 )
}

export default UpdateProfile