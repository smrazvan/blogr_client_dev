import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import TFeedPost from "../../types/models/TFeedPost";
import TPost from "../../types/models/TPost";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5080"}),
  endpoints: (builder) => ({
    getPosts: builder.query<TFeedPost[], void>({
      query: () => "/Posts",
      transformResponse: (rawResult: TFeedPost[]) => {
        return rawResult;
      }
    }),
    getPost: builder.query<TPost, number>({
      query: (id) => `/Posts/${id}`,
      transformResponse: (rawResult: TPost) => {
        return rawResult;
      }
    }),
    addPost: builder.mutation<TPost, Partial<TPost>>({
      query(body){
        return {
          url: `/Posts`,
          method: 'POST',
          body,
        }
      },
    })
  })
});

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = postsApi;