import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import TPost from "../../types/models/TPost";

export const bloggrApi = createApi({
  reducerPath: "bloggrApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5080"}),
  endpoints: (builder) => ({
    getPosts: builder.query<TPost[], void>({
      query: () => "/Posts",
      transformResponse: (rawResult: TPost[]) => {
        return rawResult;
      }
    })
  })
});

export const { useGetPostsQuery } = bloggrApi;