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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        authenticate(data, () => {
          toast.success(`Hey ${data?.user?.name}, Welcome back!`)
        })
        dispatch(
          userLoggedIn({
            token: data.token,
            user: data.user,
          })
        )
        if (data?.user?.role === 'admin') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/private'
        }
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
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: `/user/update`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
    }),
    frogotPassword: builder.mutation({
      query: (body) => ({
        url: `/forgot-password`,
        method: 'PUT',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/reset-password`,
        method: 'PUT',
        body,
      }),
    }),
    googleLogin: builder.mutation({
      query: (body) => ({
        url: `/google-login`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        authenticate(data, () => {
          toast.success(`Hey ${data?.user?.name}, Welcome back!`)
        })
        dispatch(
          userLoggedIn({
            token: data.token,
            user: data.user,
          })
        )
        if (data?.user?.role === 'admin') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/private'
        }
      },
    }),
  }),
})

export const {
  useSigninMutation,
  useSignupMutation,
  useAccountActivationMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useFrogotPasswordMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
} = apiSlice
