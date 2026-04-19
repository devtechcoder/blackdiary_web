import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isAuthModalOpen: false,
    pendingAuthAction: null,
    returnTo: null,
  },
  reducers: {
    openAuthModal: (state, action) => {
      state.isAuthModalOpen = true;
      state.pendingAuthAction = action.payload?.pendingAuthAction || null;
      state.returnTo = action.payload?.returnTo || null;
    },
    closeAuthModal: (state, action) => {
      state.isAuthModalOpen = false;
      if (!action.payload?.preservePending) {
        state.pendingAuthAction = null;
        state.returnTo = null;
      }
    },
    setPendingAuthAction: (state, action) => {
      state.pendingAuthAction = action.payload || null;
    },
    clearPendingAuthAction: (state) => {
      state.pendingAuthAction = null;
      state.returnTo = null;
    },
  },
});

export const { openAuthModal, closeAuthModal, setPendingAuthAction, clearPendingAuthAction } = modalSlice.actions;
export const selectIsAuthModalOpen = (state) => state.modal?.isAuthModalOpen ?? false;
export const selectPendingAuthAction = (state) => state.modal?.pendingAuthAction ?? null;
export const selectAuthReturnTo = (state) => state.modal?.returnTo ?? null;
export default modalSlice.reducer;
