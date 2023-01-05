import React from 'react'
import { useGetUserProfileQuery } from '../features/api/apiSlice'
import { isAuth } from '../helper/helper'

const Private = () => {
  const { data } = useGetUserProfileQuery({ id: isAuth()._id })
  console.log(data)
  return (
    <div className='container mx-auto'>
      <h1>Weilcome back to </h1>
    </div>
  )
}

export default Private
