import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import TUserAuth from "../../types/models/TUserAuth";
import { TLogin } from "../../routes/login/login";
import { TRegister } from "../../routes/register/register";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5080/Users"}),
  endpoints: (builder) => ({
    login: builder.mutation<TUserAuth, TLogin>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
      transformResponse: (rawResult: TUserAuth) => {
        return rawResult;
      }
    }),
    register: builder.mutation<TUserAuth, TRegister>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body: body,
      }),
      transformResponse: (rawResult: TUserAuth) => {
        return rawResult;
      }
    })
  })
})

export const {useLoginMutation, useRegisterMutation } = authApi;