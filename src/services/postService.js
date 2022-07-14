import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    editPosts: builder.mutation({
      query: body => ({
        url: `posts/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    addPost: builder.mutation({
      query: body => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useEditPostsMutation,
  useAddPostMutation,
  useDeletePostMutation,
} = postApi
