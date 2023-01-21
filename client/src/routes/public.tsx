import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthRoutes = React.lazy(() => import('~/features/auth'))

const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />
  },
  {
    path: '*',
    element: <Navigate to='/auth/login' replace />
  }
]

export default publicRoutes
