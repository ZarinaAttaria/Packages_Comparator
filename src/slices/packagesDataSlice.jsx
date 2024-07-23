import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageData: null,
  query: null,
  selectedPackages: [],
  isSelectPackage: true,
  historicalDownloads: [],
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
      const { packageName, downloads } = action.payload;
      if (
        !state.selectedPackages.some(
          (pkg) => pkg.packageName === packageName
        ) &&
        state.isSelectPackage
      ) {
        state.selectedPackages.push({ packageName, downloads });
      }
    },
    removePackage: (state, action) => {
      const packageName = action.payload;
      state.selectedPackages = state.selectedPackages.filter(
        (pkg) => pkg.packageName !== packageName
      );
    },
    setHistoricalDownloads: (state, action) => {
      state.historicalDownloads = action.payload;
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
  setHistoricalDownloads,
} = packageDataSlice.actions;

export default packageDataSlice.reducer;
