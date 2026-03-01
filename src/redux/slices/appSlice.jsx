import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    loggedIn: false,
    token: null,
    user: null,
    location: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.search = null;
      state.loggedIn = false;
    },
  },
});

export const { setToken, setUser, logout } = appSlice.actions;
export default appSlice.reducer;
