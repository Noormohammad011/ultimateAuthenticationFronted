import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isAuth } from '../helper/helper'
const ProtectedRoute = (redirectPath = '/') => {
  if (!isAuth()) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
