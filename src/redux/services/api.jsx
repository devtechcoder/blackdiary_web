import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";

export const BASEURL = config.API_BASEURL_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASEURL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.app?.token || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/provider-login",
        method: "POST",
        body: credentials,
      }),
    }),

    fetchPatientDetails: builder.query({
      query: (patientId) => ({
        url: `${BASEURL}/auth/patient/${patientId}`,
        method: "get",
      }),
    }),

    fetchCommonDetails: builder.query({
      query: ({ baseurl = BASEURL, url }) => ({
        url: `${baseurl}/${url}`,
        method: "get",
      }),
    }),

    commonPost: builder.mutation({
      query: ({ baseurl = BASEURL, url, method, body }) => ({
        url: `${baseurl}/${url}`,
        method,
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useCommonPostMutation, useFetchCommonDetailsQuery, useFetchPatientDetailsQuery } = api;
