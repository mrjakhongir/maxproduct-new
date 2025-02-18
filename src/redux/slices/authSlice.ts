import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const initialState = {
  isLoggedIn: Cookie.get("token") ? true : false,
  displayName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = true;
      Cookie.set("token", action.payload, { expires: 1 });
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      Cookie.remove("token");
    },
  },
});
export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export default authSlice.reducer;
