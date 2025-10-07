import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload?.user || null;
      state.token = action.payload?.token || null;
      state.isAuth = !!(action.payload?.user && action.payload?.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
