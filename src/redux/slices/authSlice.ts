import { User } from "@/types/area";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export default authSlice.reducer;
