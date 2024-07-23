import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addPackage,
  setPackageData,
  removePackage,
  clearSelectedPackages,
  setIsSelectedPackage,
  setHistoricalDownloads,
} from "./slices/packagesDataSlice";
import SearchInput from "./SearchInput";
import DownloadsChart from "./DownloadsChart";

function App() {
  const packageData = useSelector((state) => state.packages.packageData);
  const selectedPackages = useSelector(
    (state) => state.packages.selectedPackages
  );
  const historicalDownloads = useSelector(
    (state) => state.packages.historicalDownloads
  );
  const dispatch = useDispatch();

  const searchPackage = async (query) => {
    if (!query) return;
    const response = await fetch(`https://api.npms.io/v2/search?q=${query}`);
    const data = await response.json();
    dispatch(setPackageData(data.results));
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
  const handleSelectedPackage = async (pkg) => {
    if (!selectedPackages.some((p) => p.packageName === pkg)) {
      const downloads = await fetchDownloads(pkg);
      dispatch(addPackage({ packageName: pkg, downloads }));

      const historicalDownloadsData = await fetchHistoricalDownloads(pkg);

      if (historicalDownloadsData && Array.isArray(historicalDownloadsData)) {
        dispatch(setHistoricalDownloads(historicalDownloadsData));
      } else {
        console.error(
          "Historical downloads data is not an array",
          historicalDownloadsData
        );
      }

      dispatch(setIsSelectedPackage(true));
    } else {
      dispatch(removePackage(pkg));
    }
    if (selectedPackages.length >= 1) {
      dispatch(setIsSelectedPackage(false));
    }
  };

  return (
    <>
      <SearchInput
        searchPackage={searchPackage}
        selectedPackages={selectedPackages}
      />
      <div>
        {packageData && packageData.length > 0
          ? packageData.map((pkg, index) => (
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
