import React, { useEffect, useState } from 'react'
import { useSigninMutation } from '../features/api/apiSlice'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import { makeid } from '../helper/helper'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const { email, password } = values
  const [signin, { isLoading, error, isError, isSuccess }] = useSigninMutation()
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }
  const resetForm = () => {
    setValues({ ...values, name: '', email: '', password: '' })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signin({ email, password })
    resetForm()
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success('Signin successfull', {
        toastId: makeid(),
      })
      navigate('/')
    }
  }, [isSuccess, navigate])
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError) {
    toast.error(`${error?.data?.error || error?.data?.message}`, {
      toastId: makeid(),
    })
  }

  return (
    <div>
      <h2 className='text-center'>Login</h2>

      <form className='row g-3' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='inputEmail' className='form-label'>
            Email
          </label>
          <input
            onChange={handleChange('email')}
            value={email}
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
            onChange={handleChange('password')}
            value={password}
            type='password'
            className='form-control'
            id='inputPassword'
            placeholder='Password'
          />
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
