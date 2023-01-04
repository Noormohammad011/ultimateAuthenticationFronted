import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto container-height d-flex justify-content-center align-items-center'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout