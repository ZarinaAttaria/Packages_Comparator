import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageData: null,
  query: null,
  selectedPackages: [],
  isSelectPackage: true,
};

export const packageDataSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackageData: (state, action) => {
      state.packageData = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setIsSelectedPackage: (state, action) => {
      state.isSelectPackage = action.payload;
    },
    addPackage: (state, action) => {
      const packageName = action.payload;
      if (!state.selectedPackages.includes(packageName)) {
        state.selectedPackages.push(packageName);
      }
    },
    removePackage: (state, action) => {
      const packageName = action.payload;
      state.selectedPackages = state.selectedPackages.filter(
        (pkg) => pkg !== packageName
      );
    },
    clearSelectedPackages: (state) => {
      state.selectedPackages = [];
    },
  },
});

export const {
  setPackageData,
  setQuery,
  setIsSelectedPackage,
  addPackage,
  removePackage,
  clearSelectedPackages,
} = packageDataSlice.actions;

export default packageDataSlice.reducer;
