import { configureStore } from "@reduxjs/toolkit";
import packageListReducer from "../slices/packagesDataSlice.jsx";
export const store = configureStore({
  reducer: {
    packages: packageListReducer,
  },
});
