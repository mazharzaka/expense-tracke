import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://4e8461849de6.ngrok-free.app/api/",
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (user) => {
        console.log(user);
        return {
          url: "auth/login",
          method: "POST",
          body: user,
        };
      },
    }),
    profile: builder.query({
      query: (id) => `auth/profile/${id}`,
    }),
  }),
});

export const { useAuthLoginMutation, useProfileQuery } = api;
