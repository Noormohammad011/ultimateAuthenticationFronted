import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useFaceBookLoginMutation } from '../features/api/apiSlice'
import { makeid } from '../helper/helper'
import { toast } from 'react-toastify'

const Facebook = () => {
  const [faceBookLogin, { isLoading, error, isSuccess, isError }] =
    useFaceBookLoginMutation()
  const responseFacebook = (response) => {
    console.log('token', response.accessToken)
    console.log('user', response.userID)
    faceBookLogin({
      userID: response.userID,
      accessToken: response.accessToken,
    })
  }
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError) {
    toast.error(`${error?.data?.error || error?.data?.message || error} `, {
      toastId: makeid(),
    })
  }

  if (isSuccess) {
    toast.success('Signin successfull', {
      toastId: makeid(),
    })
  }
  return (
    <div className='pb-3'>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className='btn btn-primary btn-lg btn-block w-100'
          >
            <i className='fab fa-facebook pr-2'></i> Login with Facebook
          </button>
        )}
      />
    </div>
  )
}

export default Facebook
