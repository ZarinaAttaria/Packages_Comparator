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
import DownloadsFilter from "./DownloadsFilter";

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
    console.log(
      "Fetched data for package:",
      pkg,
      "with filter:",
      downloadsFilter,
      data
    );

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
    console.log("All historical data:", allHistoricalData);
    dispatch(setHistoricalDownloads(allHistoricalData));
  };

  const handleSelectedPackage = async (pkg) => {
    const response = await fetch(`https://api.npms.io/v2/package/${pkg}`);
    if (!response.ok) {
      console.error(`Package ${pkg} not found`);
      return;
    }
    const data = await response.json();

    const description =
      data.collected?.metadata?.description || "No description";
    const repository =
      data.collected?.metadata?.links?.repository || "No repository";
    const npm = data.collected?.metadata?.links?.npm || "No Npm";
    const homepage = data.collected?.metadata?.links?.homepage || "No Homepage";
    const stars = data.collected?.github?.starsCount || "Unknown";
    const issues = data.collected?.github?.issues?.count || "Unknown";
    const version = data.collected?.metadata?.version || "Unknown";

    const size = data.collected?.source?.files?.readmeSize || "Unknown";
    const carefullness = data.score?.detail?.quality || 0;
    const communityInterest = data.score?.detail?.popularity || 0;
    const health = data.evaluation?.quality?.health || 0;

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
        description,

        size,
        communityInterest,
        carefullness,
        health,
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
    console.log("All historical downloads: ", historicalDownloads);
  }, [selectedPackages, dispatch, downloadsFilter]);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <img src="logo (2).png" className="logo" />
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

      {selectedPackages.length > 0 ? (
        <DownloadsChart
          data={historicalDownloads}
          selectedPackages={selectedPackages}
        />
      ) : (
        " "
      )}
      {showComparisonTable ? <Recommendations /> : ""}
    </>
  );
}

export default App;
