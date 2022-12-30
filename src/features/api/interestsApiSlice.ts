import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import TInterest from "../../types/models/TInterest";

export const interestsApi = createApi({
  reducerPath: "interestsApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5080"}),
  endpoints: (builder) => ({
    getInterests: builder.query<TInterest[], void>({
      query: () => "/Interests",
      transformResponse: (rawResult: TInterest[]) => {
        return rawResult;
      }
    })
  })
})

export const { useGetInterestsQuery } = interestsApi;