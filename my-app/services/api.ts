import { isAccessTokenExpired } from "@/utils/isAccessTokenExpired";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.3:5000/api/",
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
      const expired = await isAccessTokenExpired();
      if (token && !expired) {
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
    balance: builder.query({
      query: () => "transactions/balance",
    }),
    Alltransactions: builder.query({
      query: () => "transactions",
    }),
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: "transactions",
        method: "POST",
        body: transaction,
      }),
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useProfileQuery,
  useBalanceQuery,
  useAlltransactionsQuery,
  useCreateTransactionMutation,
} = api;
