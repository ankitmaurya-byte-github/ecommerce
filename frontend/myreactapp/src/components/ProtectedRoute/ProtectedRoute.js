import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Profile from '../users/Profile/Profile'
function ProtectedRoute({ element: Component, ...info }) {
 const { loading, name, avatar, email, createdAt, isAuthenticated } = useSelector(state => state.userData)
 return (
  <Fragment>
   {!loading &&
    (<Route {...info} render={(props) => {
     if (!isAuthenticated) {
      return <Navigate to="/login" />
     } else {
      return <Outlet />
     }

    }
    } />)
   }

  </Fragment>
 )
}

export default ProtectedRoute