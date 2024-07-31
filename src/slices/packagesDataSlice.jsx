import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageList: null,
  query: null,

  selectedPackages: [],
  isSelectedPackage: true,
  historicalDownloads: [],
  description: null,
  showComparisonTable: false,
  showSuggestions: false,
  downloadsFilter: "last-week",
};

export const packageListSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setpackageList: (state, action) => {
      state.packageList = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    setIsSelectedPackage: (state, action) => {
      state.isSelectedPackage = action.payload;
    },
    addPackage: (state, action) => {
      const {
        packageName,
        downloads,
        repository,
        npm,
        homepage,
        stars,
        issues,
        version,
        date,
        size,
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
          repository,
          npm,
          homepage,
          stars,
          issues,
          version,
          date,
          size,
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
    setDownloadsFilter: (state, action) => {
      state.downloadsFilter = action.payload;
    },
  },
});

export const {
  setpackageList,
  setQuery,

  setIsSelectedPackage,
  addPackage,
  removePackage,
  clearSelectedPackages,
  setHistoricalDownloads,
  setComparisonTable,
  setShowSuggestions,
  setDownloadsFilter,
} = packageListSlice.actions;

export default packageListSlice.reducer;
