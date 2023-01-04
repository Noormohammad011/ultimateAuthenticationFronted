import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuth } from '../helper/helper'
const PrivateRoute = ({ children }) => {
  if (!isAuth()) {
    return <Navigate to='/login' replace />
  }
  return children
}

export default PrivateRoute
