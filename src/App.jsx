import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addPackage,
  setpackageList,
  removePackage,
  setHistoricalDownloads,
  setIsSelectedPackage,
} from "./slices/packagesDataSlice";
import SearchInput from "./SearchInput";
import DownloadsChart from "./DownloadsChart";
import { useEffect } from "react";
import ComparisonTable from "./ComparisonTable";

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
    if (!selectedPackages.some((p) => p.packageName === pkg)) {
      const downloads = await fetchDownloads(pkg);
      dispatch(
        addPackage({
          packageName: pkg,
          downloads,
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

      <div>
        {packageList && packageList.length > 0 && selectedPackages.length <= 1
          ? packageList.map((pkg, index) => (
              <div key={index}>
                <ul className="list-group">
                  <li
                    className={
                      !selectedPackages.some(
                        (selected) => selected.packageName === pkg.package.name
                      )
                        ? "list-group-item Packages_List"
                        : "list-group-item active Packages_List"
                    }
                    onClick={() => handleSelectedPackage(pkg.package.name)}
                  >
                    {pkg.package.name}
                  </li>
                </ul>
              </div>
            ))
          : ""}
      </div>
      <DownloadsChart data={historicalDownloads} />
      <ComparisonTable data={selectedPackages} />
      <div>
        {selectedPackages.length > 0 ? (
          <ul>
            {selectedPackages.map((pkg, index) => (
              <div key={index}>
                <h6>{pkg.packageName}</h6>

                <p>Downloads: {pkg.downloads}</p>
              </div>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
