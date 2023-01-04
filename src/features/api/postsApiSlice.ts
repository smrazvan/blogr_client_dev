import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import TPost from "../../types/models/TPost";
import { UnknownAsyncThunkPendingAction } from "@reduxjs/toolkit/dist/matchers";
import TPage from "../../types/models/TPage";
import TComment from "../../types/models/TComment";
import { RootState } from "../../store";
import { TLike } from "../../types/models/TLike";

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
  tagTypes: ["Comments", "Posts", "Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<TPage<TPost>, getPostsArgs>({
      query: (body) => {
        const queries = queryBuilder(body);
        return `/Posts?${queries}`;
      },
      providesTags: ["Posts"],
      transformResponse: (rawResult: TPage<TPost>) => {
        return rawResult;
      },
    }),
    getPost: builder.query<TPost, number>({
      query: (id) => `/Posts/${id}`,
      transformResponse: (rawResult: TPost) => {
        return rawResult;
      },
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<TPost, Partial<TPost>>({
      query(body) {
        return {
          url: `/Posts`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Posts"],
    }),
    removePost: builder.mutation<TPost, number>({
      query(id) {
        return {
          url: `/Posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Posts", "Post"],
    }),
    updatePost: builder.mutation<TPost, Partial<TPost>>({
      query({ id, ...body }) {
        return {
          url: `/Posts/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Posts", "Post"],
    }),
    getPostComments: builder.query<TPage<TComment>, getPostCommentsArgs>({
      query: ({ postId, ...body }) => {
        let queries = "";
        if (body?.page) queries += `pageNumber=${body.page}&`;
        if (body?.sorting) queries += `orderBy=${body.sorting}&`;
        return `/Posts/${postId}/comments?${queries}`;
      },
      providesTags: ["Comments"],
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
      invalidatesTags: ["Comments", "Posts"],
    }),
    removePostComment: builder.mutation<
      TComment,
      { postId: number; commentId: number }
    >({
      query({ postId, commentId }) {
        return {
          url: `/Posts/${postId}/comments/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Comments"],
    }),
    addPostLike: builder.mutation<TLike, number>({
      query(postId) {
        return {
          url: `/Posts/${postId}/likes`,
          method: "POST",
        };
      },
      invalidatesTags: ["Posts", "Post"],
    }),
    removePostLike: builder.mutation<TLike, number>({
      query(postId) {
        return {
          url: `/Posts/${postId}/likes`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Posts", "Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useGetPostCommentsQuery,
  useAddPostCommentMutation,
  useAddPostLikeMutation,
  useRemovePostLikeMutation,
  useRemovePostCommentMutation,
  useRemovePostMutation,
  useUpdatePostMutation,
} = postsApi;
