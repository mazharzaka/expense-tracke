import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: true, token: null },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      AsyncStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      AsyncStorage.removeItem("token");
    },
  },
});

export const { login: loginAction, logout: logoutAction } = authSlice.actions;
export default authSlice.reducer;
