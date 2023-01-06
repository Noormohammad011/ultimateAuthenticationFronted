import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import { useGoogleLoginMutation } from '../features/api/apiSlice'
import { makeid } from '../helper/helper'
import { toast } from 'react-toastify'


const Google = () => {
  
  const [googleLogin, { isLoading, error, isSuccess }] =
    useGoogleLoginMutation()
  const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ clientId: clientId })
    })
  }, [clientId])

  const responseGoogle = (response) => {
    googleLogin({ idToken: response.tokenId })
  }
  if (isLoading) {
    return <p>Loading</p>
  }

  const onFailure = (err) => {
    console.log('failed:', err)
    toast.error(`${error?.data?.error || error?.data?.message || err}`, {
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
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={onFailure}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='btn btn-danger btn-lg btn-block w-100'
          >
            <i className='fab fa-google pr-2'></i> Login with Google
          </button>
        )}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Google
