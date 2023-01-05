import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import { useResetPasswordMutation } from '../features/api/apiSlice'
import { toast } from 'react-toastify'
import { makeid } from '../helper/helper'
const ResetPassword = () => {
  const { tokenId } = useParams()
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
  })
  const [resetPassword, { isLoading, error, isError, isSuccess }] =
    useResetPasswordMutation()
  useEffect(() => {
    let { name } = decodeToken(tokenId)
    if (tokenId) {
      setValues({ ...values, name, token: tokenId })
    }
    // eslint-disable-next-line
  }, [])

  const { name, token, newPassword } = values

  const resetForm = () => {
    setValues({ ...values, name: '', token: '', newPassword: '' })
  }

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    resetPassword({ newPassword, resetPasswordLink: token })
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
 

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type='password'
          className='form-control'
          placeholder='Type new password'
          required
        />
      </div>

      <div className='my-3'>
        <button className='btn btn-primary'>Reset password</button>
      </div>
    </form>
  )

  return (
    <div>
      <h1 className='p-5 text-center'>Hey {name}, Type your new password</h1>
      {passwordResetForm()}
    </div>
  )
}

export default ResetPassword
