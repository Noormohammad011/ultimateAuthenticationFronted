import React, { useState } from 'react'
import { useFrogotPasswordMutation } from '../features/api/apiSlice'
import { makeid } from '../helper/helper'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
  })

  const { email } = values
  const [frogotPassword, { isLoading, error, isError, isSuccess }] =
    useFrogotPasswordMutation()
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }
  const resetForm = () => {
    setValues({ ...values, email: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    frogotPassword({ email })
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
    toast.success('Email Send Successfully', {
      toastId: makeid(),
    })
  }

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>

      <div className='my-3'>
        <button className='btn btn-primary'>Request password reset link</button>
      </div>
    </form>
  )

  return (
    <div>
      <h1 className='p-5 text-center'>Forgot password</h1>
      {passwordForgotForm()}
    </div>
  )
}

export default ForgotPassword
