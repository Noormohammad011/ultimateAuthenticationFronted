import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authenticate, isAuth } from '../../helper/helper'
import { toast } from 'react-toastify'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        const { data } = await queryFulfilled
        authenticate(data, () => {
          toast.success(`Hey ${data?.user?.name}, Welcome back!`)
        })
        setTimeout(() => {
          isAuth() && window.location.reload()
        }, 2500)
      },
    }),
    accountActivation: builder.mutation({
      query: (body) => ({
        url: '/account-activation',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useSigninMutation,
  useSignupMutation,
  useAccountActivationMutation,
} = apiSlice
