import React, { useState } from 'react'
import { useSignupMutation } from '../features/api/apiSlice'
import { toast } from 'react-toastify'
import { makeid } from '../helper/helper'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = values
  //rtk query signup mutation
  const [signup, { isLoading, error, isError, isSuccess }] = useSignupMutation()
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }
  const resetForm = () => {
    setValues({ ...values, name: '', email: '', password: '' })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signup({ name, email, password })
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
    toast.success('Signup successfull', {
      toastId: makeid(),
    })
  }
  return (
    <div>
      <h2 className='text-center'>Registration</h2>
      <form className='row g-3' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='inputName' className='form-label'>
            Name
          </label>
          <input
            onChange={handleChange('name')}
            value={name}
            type='text'
            className='form-control'
            id='inputName'
            placeholder='Name'
          />
        </div>
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
