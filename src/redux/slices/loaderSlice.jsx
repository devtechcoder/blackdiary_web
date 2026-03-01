import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false, // global loader
  },
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { updateLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
