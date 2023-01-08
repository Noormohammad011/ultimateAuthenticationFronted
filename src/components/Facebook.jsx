import React from 'react'
import { useFaceBookLoginMutation } from '../features/api/apiSlice'
import { makeid } from '../helper/helper'
import { toast } from 'react-toastify'
import OAuth2Login from 'react-simple-oauth2-login'
const Facebook = () => {
  const [faceBookLogin, { isLoading, error, isSuccess, isError }] =
    useFaceBookLoginMutation()
  const onSuccess = (response) => {
    faceBookLogin({
      accessToken: response.access_token,
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
  const onFailure = (response) => {
    toast.error(response, {
      toastId: makeid(),
    })
  }
  return (
    <div className='pb-3'>
      <OAuth2Login
        authorizationUrl='https://www.facebook.com/dialog/oauth'
        responseType='token'
        clientId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        redirectUri='https://ultimateauth.onrender.com/oauth-callback'
        onSuccess={onSuccess}
        onFailure={onFailure}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className='btn btn-primary btn-lg btn-block w-100'
          >
            <i className='fab fa-facebook pr-2'></i> Login with Facebook
          </button>
        )}
      />
      ,
    </div>
  )
}

export default Facebook
