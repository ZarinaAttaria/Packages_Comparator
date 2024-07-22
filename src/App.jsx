import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addPackage,
  setPackageData,
  removePackage,
  clearSelectedPackages,
} from "./slices/packagesDataSlice";
import SearchInput from "./SearchInput";

function App() {
  const packageData = useSelector((state) => state.packages.packageData);
  const selectedPackages = useSelector(
    (state) => state.packages.selectedPackages
  );
  const dispatch = useDispatch();

  const searchPackage = async (query) => {
    if (!query) return;
    dispatch(clearSelectedPackages());
    const response = await fetch(`https://api.npms.io/v2/search?q=${query}`);
    const data = await response.json();
    dispatch(setPackageData(data.results));
  };

  const handleSelectedPackage = (pkg) => {
    if (!selectedPackages.includes(pkg)) {
      dispatch(addPackage(pkg));
    } else {
      dispatch(removePackage(pkg));
    }
  };

  return (
    <>
      <SearchInput
        searchPackage={searchPackage}
        selectedPackages={selectedPackages}
      />
      <div>
        {packageData && packageData.length > 0 ? (
          packageData.map((pkg, index) => (
            <div key={index}>
              <ul>
                <li onClick={() => handleSelectedPackage(pkg.package.name)}>
                  {pkg.package.name}
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p>No package data available.</p>
        )}
      </div>
    </>
  );
}

export default App;
