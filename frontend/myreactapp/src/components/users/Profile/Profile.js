import React, { useEffect } from 'react'
import style from './profile.module.scss'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../layout/loader/Loader'
import MetaData from '../../home/MetaData'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
function Profile() {
 const alert = useAlert()
 const { loading, name, avatar, email, createdAt, isAuthenticated } = useSelector(state => state.userData)
 const navigate = useNavigate()
 useEffect(() => {
  if (!isAuthenticated) {
   alert.success("Login first Please")
   navigate('/login')
  }
 }, [isAuthenticated, navigate, alert])
 return (
  <Fragment>
   {loading ? <Loader /> : <Fragment>
    <MetaData title={`${name}'s profile`} />
    <div className={style.profileContainer}>
     <div className={style.image}>
      <h1>My Profile</h1>
      <img src={avatar?.post_url} alt="" />
      <Link to={'me/update'}>Edit Profile</Link>
     </div>
     <div className={style.details}>
      <div>
       <h2>Name</h2>
       <p>{name}</p>
      </div>
      <div>
       <h2>Email</h2>
       <p>{email.trim()}</p>
      </div>
      <div>
       <h2>Joined on</h2>
       <p>{String(createdAt).substr(0, 10)}</p>
      </div>
      <div>
       <Link to={'/orders'}>My orders</Link>
       <Link to={'/password/me/update'}>change password</Link>
      </div>
     </div>
    </div>
   </Fragment>
   }
  </Fragment>
 )
}

export default Profile