import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    clearSearchValue: (state) => {
      state.value = "";
    },
  },
});

export const { setSearchValue, clearSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
