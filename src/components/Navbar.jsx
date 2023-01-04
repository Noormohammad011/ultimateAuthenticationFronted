import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isAuth, signout } from '../helper/helper'
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand' href='#'>
          Navbar
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {!isAuth() && (
              <>
                {' '}
                <li className='nav-item'>
                  <NavLink
                    to='/signup'
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    Registration
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to='/login'
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {isAuth() && (
              <li className='nav-item'>
                <span className='nav-link'>{isAuth().name}</span>
              </li>
            )}
            {isAuth() && (
              <li className='nav-item'>
                <span
                  className='nav-link'
                  style={{ cursor: 'pointer', color: '#fff' }}
                  onClick={() => {
                    signout(() => {
                      navigate('/')
                    })
                  }}
                >
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
