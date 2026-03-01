import { createSlice } from "@reduxjs/toolkit";

const masterDataSlice = createSlice({
  name: "masterData",
  initialState: {
    allPageHeadings: [],
    socialSettings: [],
    generalSettings: [],
  },
  reducers: {
    setAllPageHeadings: (state, action) => {
      state.allPageHeadings = action.payload;
    },
    setSocialSettings: (state, action) => {
      state.socialSettings = action.payload;
    },
    setGeneralSettings: (state, action) => {
      state.generalSettings = action.payload;
    },
  },
});

export const { setAllPageHeadings, setSocialSettings, setGeneralSettings } = masterDataSlice.actions;
export default masterDataSlice.reducer;
