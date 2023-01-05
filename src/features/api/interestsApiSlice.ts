import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import TInterest from "../../types/models/TInterest";
import { RootState } from "../../store";

export const interestsApi = createApi({
  reducerPath: "interestsApi",
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
  tagTypes: ["Interests"],
  endpoints: (builder) => ({
    getInterests: builder.query<TInterest[], void>({
      query: () => "/Interests",
      transformResponse: (rawResult: TInterest[]) => {
        return rawResult;
      },
      providesTags: ["Interests"],
    }),
    addUserInterest: builder.mutation<TInterest, Partial<TInterest>>({
      query(body) {
        return {
          url: `/Users/createdInterests`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Interests"],
    }),
  }),
});

export const { useGetInterestsQuery, useAddUserInterestMutation } =
  interestsApi;
