import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import TUser from "../../types/models/TUser";
import { RootState } from "../../store";

export const usersApi = createApi({
  reducerPath: "usersApi",
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
    getUser: builder.query<TUser, string>({
      query: (username) => `/Users/username/$${username}`,
      transformResponse: (rawResult: TUser) => {
        return rawResult;
      },
    }),
    updateUser: builder.mutation<TUser, Partial<TUser>>({
      query({ id, ...body }) {
        return {
          url: `/Users/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = usersApi;
