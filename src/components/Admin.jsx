import React, { useState } from 'react'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../features/api/apiSlice'
import { isAuth, makeid, updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Admin = () => {
  const { user } = useSelector((state) => state.auth)
  const { data, isError, isLoading } = useGetUserProfileQuery({
    id: isAuth()._id,
  })
  const [
    updateUserProfile,
    {
      data: profileUpdateData,
      isLoading: profileUpdateIsloading,
      error,
      isError: profileUpdateIsError,
      isSuccess: profileUpdateIsSuccess,
    },
  ] = useUpdateUserProfileMutation()
  const [values, setValues] = useState({
    role: data?.user?.role || isAuth()?.role,
    name: data?.user?.name || isAuth()?.name,
    email: data?.user?.email || isAuth()?.email,
    password: '',
  })

  const navigate = useNavigate()
  const { role, name, email, password } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  if (isError) {
    return navigate('/')
  }
  if (isLoading) {
    return <p>Loading...</p>
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    updateUserProfile({ name, password })
  }
  if (profileUpdateIsloading) {
    return <p>Loading</p>
  }
  if (profileUpdateIsError) {
    toast.error(`${error?.data?.error || error?.data?.message}`, {
      toastId: makeid(),
    })
  }
  if (profileUpdateIsSuccess) {
    updateUser(profileUpdateData?.updatedUser, () => {
      toast.success('Profile updated successfully', {
        toastId: makeid(),
      })
    })
  }
  const updateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input
          defaultValue={role}
          type='text'
          className='form-control'
          disabled
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          value={name}
          type='text'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          defaultValue={email}
          type='email'
          className='form-control'
          disabled
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type='password'
          className='form-control'
        />
      </div>

      <div className='my-3'>
        <button className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )
  return (
    <div className='container mx-auto'>
      <div className='col-md-6 offset-md-3'>
        <h1 className='pt-5 text-center'>Admin</h1>
        <p className='lead text-center'>Profile update</p>
        {updateForm()}
      </div>
    </div>
  )
}

export default Admin
