import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from "./auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
