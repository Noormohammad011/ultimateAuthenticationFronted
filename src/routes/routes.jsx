import { createBrowserRouter } from 'react-router-dom'
import Activate from '../components/Activate'
import Home from '../components/Home'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Admin from '../components/Admin'
import PrivateRoute from '../components/PrivateRoute'
import Private from '../components/Private'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'

export const baseRoute = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/auth/activate/:tokenId',
        element: <Activate />,
      },
      {
        path: '/admin',
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
      {
        path: '/private',
        element: (
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        ),
      },
      {
        path: '/auth/password/forgot',
        element: <ForgotPassword />,
      },
      {
        path: '/auth/password/reset/:tokenId',
        element: <ResetPassword />,
      },
    ],
  },
])
