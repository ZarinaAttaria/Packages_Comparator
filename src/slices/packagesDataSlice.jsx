import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageList: null,
  query1: null,
  query2: null,
  selectedPackages: [],
  isSelectedPackage: true,
  historicalDownloads: [],
  description: null,
  showComparisonTable: false,
  showSuggestions: false,
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
      const {
        packageName,
        downloads,
        description,
        repository,
        date,
        publisher,
        maintainers,
        communityInterest,
        carefullness,
      } = action.payload;
      if (!state.isSelectedPackage) return state;

      if (
        !state.selectedPackages.some((pkg) => pkg.packageName === packageName)
      ) {
        state.selectedPackages.push({
          packageName,
          downloads,
          description,
          repository,
          date,
          publisher,
          maintainers,
          communityInterest,
          carefullness,
        });
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
    setComparisonTable: (state, action) => {
      state.showComparisonTable = action.payload;
    },
    setShowSuggestions: (state, action) => {
      state.showSuggestions = action.payload;
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
  setComparisonTable,
  setShowSuggestions,
} = packageListSlice.actions;

export default packageListSlice.reducer;
