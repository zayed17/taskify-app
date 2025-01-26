import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/user/`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userData) => ({
        url: 'forgot-password',
        method: 'POST',
        body: userData,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, newPassword }: { token: string; newPassword: string }) => ({
        url: `reset-password/${token}`,
        method: 'POST',
        body: { newPassword },
      }),
    }),

    googleAuth: builder.mutation({
      query: (userData) => ({
        url: 'google-auth',
        method: 'POST',
        body: userData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }), 
      }),
  }),
});

export const { useLoginMutation, useSignupMutation , useLogoutMutation,useForgotPasswordMutation,useResetPasswordMutation , useGoogleAuthMutation} = userApi;
