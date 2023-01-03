import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import TPost from "../../types/models/TPost";
import { UnknownAsyncThunkPendingAction } from "@reduxjs/toolkit/dist/matchers";
import TPage from "../../types/models/TPage";
import TComment from "../../types/models/TComment";
import { RootState } from "../../store";

type getPostsArgs = {
  username?: string;
  interests?: string[];
  page?: number;
  sorting?: string;
};

type getPostCommentsArgs = {
  postId: number;
  page?: number;
  sorting?: string;
};

const queryBuilder = (body: getPostsArgs) => {
  let queries = "";
  if (body?.page) queries += `pageNumber=${body.page}&`;
  if (body?.interests && body.interests.length > 0)
    body.interests.forEach((interest) => {
      queries += `interests=${interest}&`;
    });
  if (body?.sorting) queries += `orderBy=${body.sorting}&`;
  if (body?.username) queries += `username=${body.username}&`;
  return queries;
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5080",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getPosts: builder.query<TPage<TPost>, getPostsArgs>({
      query: (body) => {
        const queries = queryBuilder(body);
        return `/Posts?${queries}`;
      },
      transformResponse: (rawResult: TPage<TPost>) => {
        return rawResult;
      },
    }),
    getPost: builder.query<TPost, number>({
      query: (id) => `/Posts/${id}`,
      transformResponse: (rawResult: TPost) => {
        return rawResult;
      },
    }),
    addPost: builder.mutation<TPost, Partial<TPost>>({
      query(body) {
        return {
          url: `/Posts`,
          method: "POST",
          body,
        };
      },
    }),
    getPostComments: builder.query<TPage<TComment>, getPostCommentsArgs>({
      query: ({ postId, ...body }) => {
        let queries = "";
        if (body?.page) queries += `pageNumber=${body.page}&`;
        if (body?.sorting) queries += `orderBy=${body.sorting}&`;
        return `/Posts/${postId}/comments?${queries}`;
      },
      transformResponse: (rawResult: TPage<TComment>) => {
        return rawResult;
      },
    }),
    addPostComment: builder.mutation<
      TComment,
      Partial<TComment> & Pick<TPost, "id">
    >({
      query({ id, ...body }) {
        return {
          url: `/Posts/${id}/comments`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useGetPostCommentsQuery,
  useAddPostCommentMutation,
} = postsApi;
