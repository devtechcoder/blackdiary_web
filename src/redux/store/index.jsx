import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import appSlice from "../slices/appSlice";
import searchSlice from "../slices/searchSlice";
import loaderReducer, { updateLoading } from "../slices/loaderSlice";
import masterDataReducer from "../slices/masterDataSlice";
import authReducer from "../slices/authSlice";
import modalReducer from "../slices/modalSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appSlice,
    search: searchSlice,
    loader: loaderReducer,
    masterData: masterDataReducer,
    auth: authReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
