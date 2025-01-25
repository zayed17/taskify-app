import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/task/`,
    credentials: 'include',
  }),
    endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskData) => ({
        url: '/create-task',
        method: 'POST',
        body: taskData,
      }),
    }),
    getTask: builder.query({
      query: () => 'list-task',
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/delete-task/${taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: builder.mutation({
      query: ({ taskId, updatedData }) => ({
        url: `/update-task/${taskId}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
  }),
});

export const { useCreateTaskMutation, useGetTaskQuery ,useDeleteTaskMutation ,useUpdateTaskMutation} = taskApi;
