import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/user/`,
    credentials: 'include',
  }),
    endpoints: (builder) => ({
    createFeed: builder.mutation({
      query: (feedData) => ({
        url: '/create-feed',
        method: 'POST',
        body: feedData,
      }),
    }),
    getFeed: builder.query({
      query: () => 'list-feed',
    }),
    deleteFeed: builder.mutation({
        query: (feedId) => ({
          url: `/delete-feed/${feedId}`,
          method: 'DELETE',
        }),
      }),
  }),
});

export const {useCreateFeedMutation,useGetFeedQuery,useDeleteFeedMutation} = feedApi;
