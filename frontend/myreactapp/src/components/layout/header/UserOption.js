import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Backdrop from "@material-ui/core/Backdrop";
import { useEffect } from 'react';
import image from '../../../images/avatar.png'
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { logoutUser } from '../../../store/action/userAction';
import LoginIcon from '@mui/icons-material/Login';
import { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
export default function UserOption({ user }) {
 const location = useLocation();
 const { isAuthenticated } = user
 const alert = useAlert()
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const [open, setOpen] = useState(false)
 const [actions, setActions] = useState([

  { icon: <ShoppingCartIcon />, name: 'Cart', clickHandleFunc: cart }
 ])

 function logout() {
  dispatch(logoutUser());
  alert.success("Logout Successfully");

 }
 function login() {
  if (location.pathname !== '/login') {
   navigate('/login')
  }
 }
 function profile() {
  navigate('/profile')
 }
 function orders() {
  navigate('/orders')
 }
 function cart() {
  navigate('/cart')
 }
 function dashboard() {
  navigate('/dashboard')
 }
 useEffect(() => {
  let action = [...actions]
  console.log(location);
  // if (isAuthenticated) {
  //  action.push()
  // }
  if (user.role === 'admin') {
   action.unshift({ icon: <DashboardIcon />, name: 'Copy', clickHandleFunc: dashboard })
  }
  if (isAuthenticated) {
   action.push({ icon: <ExitToAppIcon />, name: 'Logout', clickHandleFunc: logout }, { icon: <PersonIcon />, name: 'Profile', clickHandleFunc: profile },
    { icon: <ListAltIcon />, name: 'Orders', clickHandleFunc: orders },)
  } else {
   action.push({ icon: <LoginIcon />, name: 'Login', clickHandleFunc: login })
  }
  setActions([...action])
 }, [])
 return (
  <Fragment>
   <Backdrop open={open} style={{ zIndex: 90 }} />
   <SpeedDial
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    style={{
     position: "fixed",
     zIndex: 99,
    }}
    ariaLabel="SpeedDial basic example"
    direction='down'
    sx={{ position: 'absolute', top: 16, right: 16 }}
    icon={< img style={{
     width: "56px", height: "56px", objectPosition: "center", objectFit: 'cover', borderRadius: '50%'
    }} src={user?.avatar?.post_url || image} alt='' />}
   >
    {
     actions.map((action) => (
      <SpeedDialAction
       onClick={action.clickHandleFunc}
       key={action.name}
       icon={action.icon}
       tooltipTitle={action.name}
      />
     ))
    }
   </SpeedDial >
  </Fragment>
 );
}
