import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import { useAccountActivationMutation } from '../features/api/apiSlice'
import { toast } from 'react-toastify'
import { makeid } from '../helper/helper'
const Activate = () => {
  const { tokenId } = useParams()
   const [values, setValues] = useState({
     name: '',
     token: '',
     show: true,
   })
   const { name, token } = values
  useEffect(() => {
    
    let { name } = decodeToken(tokenId)

    if (tokenId) {
      setValues({ ...values, name, token: tokenId })
    }
    // eslint-disable-next-line
  }, [])

  const [accountActivation, { isLoading, error, isError, isSuccess }] =
    useAccountActivationMutation()
  const clickSubmit = (e) => {
    e.preventDefault()
    accountActivation({ token })
  }

   const activationLink = () => (
     <div className='text-center'>
       <h1 className='p-5'>Hey {name}, Ready to activate your account?</h1>
       <button
         onClick={clickSubmit}
         type='button'
         class='btn btn-outline-success'
       >
         Activate Account
       </button>
     </div>
  )
  if (isLoading) { 
    return <p>Loading</p>
  }
  if (isSuccess) { 
    toast.success('Account activation successfull', {
      toastId: makeid(),
    })
  }
  if (isError) { 
    toast.error(`${error?.data?.error || error?.data?.message}`, {
      toastId: makeid(),
    })
  }
 
  return (
    <div className='container mx-auto'>
      {activationLink()}
    </div>
  )
}

export default Activate
