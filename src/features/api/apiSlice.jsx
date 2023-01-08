import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authenticate, getCookie } from '../../helper/helper'
import { toast } from 'react-toastify'
import { userLoggedIn } from './authSlice'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        console.log(data)
        authenticate(data, () => {
          toast.success(`Hey ${data?.user?.name}, Welcome back!`)
        })
        dispatch(
          userLoggedIn({
            token: data.token,
            user: data.user,
          })
        )
      },
    }),
    accountActivation: builder.mutation({
      query: (body) => ({
        url: '/account-activation',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    getUserProfile: builder.query({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
      providesTags: ['Auth'],
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (typeof window !== 'undefined') {
          let auth = JSON.parse(localStorage.getItem('user'))
          auth = data?.updatedUser
          localStorage.setItem('user', JSON.stringify(auth))
        }
      },
      invalidatesTags: ['Auth'],
    }),
    frogotPassword: builder.mutation({
      query: (body) => ({
        url: `/forgot-password`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/reset-password`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    googleLogin: builder.mutation({
      query: (body) => ({
        url: `/google-login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
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
      },
    }),
    faceBookLogin: builder.mutation({
      query: (body) => ({
        url: `/facebook-login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
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
  useFaceBookLoginMutation,
} = apiSlice
