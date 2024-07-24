import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageList: null,
  query1: null,
  query2: null,
  selectedPackages: [],
  isSelectedPackage: true,
  historicalDownloads: [],
};

export const packageListSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setpackageList: (state, action) => {
      state.packageList = action.payload;
    },
    setQuery1: (state, action) => {
      state.query1 = action.payload;
    },
    setQuery2: (state, action) => {
      state.query2 = action.payload;
    },
    setIsSelectedPackage: (state, action) => {
      state.isSelectedPackage = action.payload;
    },
    addPackage: (state, action) => {
      const { packageName, downloads } = action.payload;
      if (!state.isSelectedPackage) return state;

      if (
        !state.selectedPackages.some((pkg) => pkg.packageName === packageName)
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
  setpackageList,
  setQuery1,
  setQuery2,

  setIsSelectedPackage,
  addPackage,
  removePackage,
  clearSelectedPackages,
  setHistoricalDownloads,
} = packageListSlice.actions;

export default packageListSlice.reducer;
