import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Profile from '../users/Profile/Profile'
import Auth from '../users/Auth'
function ProtectedRoute({ user }) {
 const { loading, isAuthenticated } = user
 return (
  <Fragment>
   {/* {!loading &&
    (<Route render={(props) => {
     if (!isAuthenticated) {
      return <Navigate to="/login" />
     } else {
      return <Outlet />
     }

    }
    } />)
   } */}
   {!loading &&
    isAuthenticated ?
    <Auth /> : <Outlet />

   }


  </Fragment>
 )
}

export default ProtectedRoute