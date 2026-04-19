import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  try {
    const token = localStorage.getItem("token");
    const userProfile = localStorage.getItem("userProfile");

    return {
      isAuthenticated: Boolean(token),
      user: userProfile ? JSON.parse(userProfile) : null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    hydrateAuthState: (state, action) => {
      state.isAuthenticated = Boolean(action.payload?.isAuthenticated);
      state.user = action.payload?.user || null;
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload?.user || null;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { hydrateAuthState, setAuthState, clearAuthState } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated ?? false;
export const selectUser = (state) => state.auth?.user ?? null;
export default authSlice.reducer;
