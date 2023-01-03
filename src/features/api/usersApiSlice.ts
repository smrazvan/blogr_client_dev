import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import TUser from "../../types/models/TUser";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5080"}),
  endpoints: (builder) => ({
    getUser: builder.query<TUser, string>({
      query: (username) => `/Users/username/$${username}`,
      transformResponse: (rawResult: TUser) => {
        return rawResult;
      }
    }),
    updateUser: builder.mutation<TUser, Partial<TUser>>({
      query({id, ...body}){
        return {
          url: `/Users/${id}`,
          method: "POST",
          body,
        };
      }
    })
  })
})

export const {useGetUserQuery, useUpdateUserMutation} = usersApi;