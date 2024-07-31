import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addPackage,
  setpackageList,
  removePackage,
  setHistoricalDownloads,
  setIsSelectedPackage,
  setComparisonTable,
  setShowSuggestions,
  clearSelectedPackages,
  setDownloadsFilter,
} from "./slices/packagesDataSlice";
import SearchInput from "./SearchInput";
import DownloadsChart from "./DownloadsChart";
import { useEffect, useState } from "react";
import ComparisonTable from "./ComparisonTable";
import Recommendations from "./Recommendations";

function App() {
  const packageList = useSelector((state) => state.packages.packageList);
  const selectedPackages = useSelector(
    (state) => state.packages.selectedPackages
  );
  const historicalDownloads = useSelector(
    (state) => state.packages.historicalDownloads
  );
  const isSelectedPackage = useSelector(
    (state) => state.packages.isSelectedPackage
  );
  const showComparisonTable = useSelector(
    (state) => state.packages.showComparisonTable
  );
  const showSuggestions = useSelector(
    (state) => state.packages.showSuggestions
  );
  const downloadsFilter = useSelector(
    (state) => state.packages.downloadsFilter
  );
  const dispatch = useDispatch();
  const dataResults = [];
  const searchPackage = async (query) => {
    if (!query) return;
    const response = await fetch(`https://api.npms.io/v2/search?q=${query}`);
    const data = await response.json();
    dispatch(setpackageList(data.results));
    return data.results;
  };

  const fetchDownloads = async (pkg) => {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${pkg}`
    );
    const data = await response.json();
    return data.downloads;
  };

  const fetchHistoricalDownloads = async (pkg) => {
    const response = await fetch(
      `https://api.npmjs.org/downloads/range/${downloadsFilter}/${pkg}`
    );
    const data = await response.json();

    if (data.downloads && Array.isArray(data.downloads)) {
      return data.downloads.map((item) => ({
        ...item,
        packageName: pkg,
      }));
    } else {
      throw new Error("Invalid downloads data");
    }
  };

  const updateHistoricalDownloads = async () => {
    let allHistoricalData = [];
    let selectedPackagesArray = selectedPackages.map((p) => p.packageName);
    for (const pkg of selectedPackagesArray) {
      const historicalDownloadsData = await fetchHistoricalDownloads(pkg);
      if (historicalDownloadsData && Array.isArray(historicalDownloadsData)) {
        allHistoricalData = allHistoricalData.concat(historicalDownloadsData);
      }
    }
    dispatch(setHistoricalDownloads(allHistoricalData));
  };

  const handleSelectedPackage = async (pkg) => {
    const response = await fetch(`https://api.npms.io/v2/package/${pkg}`);
    if (!response.ok) {
      console.error(`Package ${pkg} not found`);
      return;
    }
    const data = await response.json();

    const repository =
      data.collected?.metadata?.repository?.url || "No repository";
    const npm = data.collected?.metadata?.links?.npm || "No Npm";
    const homepage = data.collected?.metadata?.links?.homepage || "No Homepage";
    const stars = data.collected?.metadata?.github?.starsCount || "Unknown";
    const issues = data.collected?.metadata?.github?.issues?.count || "Unknown";
    const version = data.collected?.metadata?.version || "Unknown";
    const date = data.collected?.metadata?.date || "No last Modified date";
    const size =
      data.collected?.metadata?.source?.files?.readmeSize || "Unknown";
    const carefullness = data.score?.detail?.quality || 0;
    const communityInterest = data.score?.detail?.popularity || 0;

    if (!selectedPackages.some((p) => p.packageName === pkg)) {
      const downloads = await fetchDownloads(pkg);

      const newPackage = {
        packageName: pkg,
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
      };

      dispatch(addPackage(newPackage));
      await updateHistoricalDownloads();
    } else {
      dispatch(removePackage(pkg));
      await updateHistoricalDownloads();
    }
  };

  useEffect(() => {
    if (selectedPackages.length > 0) {
      updateHistoricalDownloads();
    } else {
      dispatch(setHistoricalDownloads([]));
    }
  }, [selectedPackages, dispatch, downloadsFilter]);

  const handleDownloadsFilter = (value) => {
    dispatch(setDownloadsFilter(value));
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Npm Packages Comparator
          </a>
        </nav>
      </div>

      <SearchInput
        searchPackage={searchPackage}
        selectedPackages={selectedPackages}
        handleSelectedPackage={handleSelectedPackage}
      />

      {showComparisonTable ? <ComparisonTable data={selectedPackages} /> : ""}

      <div className="dropdown ">
        <button
          className="btn btn-secondary dropdown-toggle filter_Dropdown"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Downloads
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleDownloadsFilter("last-month")}
          >
            1 Month
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleDownloadsFilter("last-year")}
          >
            1 year
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleDownloadsFilter("2022-07-30:2024-07-30")}
          >
            2 years
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleDownloadsFilter("2019-07-30:2024-07-30")}
          >
            5 years
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleDownloadsFilter("2021-07-30:2024-07-30")}
          >
            3 years
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleDownloadsFilter("2024-05-30:2024-07-30")}
          >
            2 months
          </a>
        </div>
      </div>
      {selectedPackages.length > 0 ? (
        <DownloadsChart data={historicalDownloads} />
      ) : (
        " "
      )}

      {showComparisonTable ? <Recommendations /> : ""}
    </>
  );
}

export default App;
