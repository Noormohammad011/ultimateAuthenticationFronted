import { createBrowserRouter } from 'react-router-dom'
import Activate from '../components/Activate'
import Home from '../components/Home'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'
import Signup from '../components/Signup'
import Login from '../components/Login'

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
        element: (
          <>
            <Login />
          </>
        ),
      },
      {
        path: '/auth/activate/:tokenId',
        element: <Activate />,
      },
    ],
  },
])
