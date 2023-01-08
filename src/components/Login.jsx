import React, { useState } from 'react'
import { useSigninMutation } from '../features/api/apiSlice'
import { toast } from 'react-toastify'

import { Link } from 'react-router-dom'
import { makeid } from '../helper/helper'
import Google from './Google'
import Facebook from './Facebook'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const { email, password } = values
  const [signin, { isLoading, error, isError, isSuccess }] = useSigninMutation()

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const resetForm = () => {
    setValues({ ...values, name: '', email: '', password: '' })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signin({ email, password })
    resetForm()
  }
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError) {
    toast.error(`${error?.data?.error || error?.data?.message}`, {
      toastId: makeid(),
    })
  }
  if (isSuccess) {
    toast.success('Signin successfull', {
      toastId: makeid(),
    })
  }

  return (
    <div>
      <h2 className='text-center'>Login</h2>
      <Google />
      <Facebook />
      <form className='row g-3' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='inputEmail' className='form-label'>
            Email
          </label>
          <input
            onChange={handleChange}
            value={email}
            name='email'
            type='email'
            className='form-control'
            id='inputEmail'
            placeholder='Email'
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputPassword' className='form-label'>
            Password
          </label>
          <input
            onChange={handleChange}
            name='password'
            value={password}
            type='password'
            className='form-control'
            id='inputPassword'
            placeholder='Password'
          />
        </div>
        <button type='submit' className='btn btn-sm btn-outline-primary'>
          Login
        </button>
        <br />
        <Link
          to='/auth/password/forgot'
          className='btn btn-sm btn-outline-danger'
        >
          Forgot Password
        </Link>
      </form>
    </div>
  )
}

export default Login
