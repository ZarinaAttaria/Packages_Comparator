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
} from "./slices/packagesDataSlice";
import SearchInput from "./SearchInput";
import DownloadsChart from "./DownloadsChart";
import { useEffect } from "react";
import ComparisonTable from "./ComparisonTable";
import Recommendations from "./Recommendations";
import Suggestions from "./Suggestions";

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

  const dispatch = useDispatch();
  const searchPackage = async (query) => {
    if (!query) return;
    const response = await fetch(`https://api.npms.io/v2/search?q=${query}`);
    const data = await response.json();
    dispatch(setpackageList(data.results));
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
      `https://api.npmjs.org/downloads/range/last-month/${pkg}`
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
    const data = await response.json();

    const description =
      data.collected.metadata.description || "No description ";
    const repository =
      data.collected.metadata.links.repository || "No repository ";
    const date = data.collected.metadata.date || "No last Modified date";
    const publisher =
      data.collected.metadata.publisher.username || "No publishers";
    const maintainers =
      data.collected.metadata.maintainers[0].email || "No maintainers";
    const carefullness = data.score.detail.quality;
    const communityInterest = data.score.detail.popularity;

    if (!selectedPackages.some((p) => p.packageName === pkg)) {
      const downloads = await fetchDownloads(pkg);

      dispatch(
        addPackage({
          packageName: pkg,
          downloads,
          description,
          repository,
          date,
          publisher,
          maintainers,
          communityInterest,
          carefullness,
        })
      );
      await updateHistoricalDownloads();
    } else {
      dispatch(removePackage(pkg));
      await updateHistoricalDownloads();
    }
    if (selectedPackages.length >= 0) {
      dispatch(setIsSelectedPackage(false));
    }
    if (selectedPackages.length >= 1) {
      dispatch(setShowSuggestions(false));
    }
  };

  useEffect(() => {
    if (selectedPackages.length > 0) {
      updateHistoricalDownloads();
    } else {
      dispatch(setHistoricalDownloads([]));
    }
  }, [selectedPackages, dispatch]);

  return (
    <>
      <SearchInput
        searchPackage={searchPackage}
        selectedPackages={selectedPackages}
      />

      {showSuggestions && (
        <Suggestions handleSelectedPackage={handleSelectedPackage} />
      )}
      {showComparisonTable ? <ComparisonTable data={selectedPackages} /> : ""}

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
