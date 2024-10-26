import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface AuthStateI {
  user: any;
  token: string | null;
}

const initialState: AuthStateI = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ data: any }>) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
