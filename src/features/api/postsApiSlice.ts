import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import TPost from "../../types/models/TPost";
import TPostsPage from "../../types/models/TPostsPage";

type getPostsArgs = {
  username?: string;
  interests?: string[];
  page?: number;
  sorting?: string;
}
const queryBuilder = (body: getPostsArgs) => {
  let queries = "";
        if(body?.page)
          queries += `pageNumber=${body.page}&`;
        if(body?.interests && body.interests.length > 0)
          body.interests.forEach(interest => {queries += `interests=${interest}&`;})
        if(body?.sorting)
          queries += `orderBy=${body.sorting}&`;
        if(body?.username)
          queries += `username=${body.username}&`;
  return queries;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5080"}),
  endpoints: (builder) => ({
    getPosts: builder.query<TPostsPage, getPostsArgs>({
      query: (body) => {
        const queries = queryBuilder(body);
        return `/Posts?${queries}`;
      },
      transformResponse: (rawResult: TPostsPage) => {
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