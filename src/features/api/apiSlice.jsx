import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authenticate, getCookie } from '../../helper/helper'
import { toast } from 'react-toastify'
import { userLoggedIn } from './authSlice'
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
      async onQueryStarted(arg, { dispatch,  queryFulfilled }) {
        const { data } = await queryFulfilled
        authenticate(data, () => {
          toast.success(`Hey ${data?.user?.name}, Welcome back!`)
        })
        dispatch(
          dispatch(
            userLoggedIn({
              token: data.token,
              user: data.user,
            })
          )
        )
      },
    }),
    accountActivation: builder.mutation({
      query: (body) => ({
        url: '/account-activation',
        method: 'POST',
        body,
      }),
    }),
    getUserProfile: builder.query({
      query: ({id}) => ({
        url: `/user/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
    }),
  }),
})

export const {
  useSigninMutation,
  useSignupMutation,
  useAccountActivationMutation,
  useGetUserProfileQuery,
} = apiSlice
