import { configureStore } from "@reduxjs/toolkit";
import packageDataReducer from "../slices/packagesDataSlice.jsx";
export const store = configureStore({
  reducer: {
    packages: packageDataReducer,
  },
});
