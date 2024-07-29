import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import _ from "lodash";
import {
  clearSelectedPackages,
  removePackage,
  setComparisonTable,
  setIsSelectedPackage,
  setQuery1,
  setQuery2,
  setShowSuggestions,
} from "./slices/packagesDataSlice";
import "./App.css";

function SearchInput({ searchPackage, selectedPackages }) {
  const queryData1 = useSelector((state) => state.packages.query1 || "");
  const queryData2 = useSelector((state) => state.packages.query2 || "");
  const dispatch = useDispatch();
  const debouncedSearch1 = _.debounce(() => searchPackage(queryData1), 300);
  const debouncedSearch2 = _.debounce(() => searchPackage(queryData2), 300);

  const handleChange = (e) => {
    dispatch(setQuery1(e.target.value));
    debouncedSearch1(e.target.value);
    dispatch(setShowSuggestions(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch1(queryData1);
    debouncedSearch2(queryData2);
    dispatch(setComparisonTable(true));
    dispatch(setShowSuggestions(false));
  };

  const handleRemovePackage = (pkg) => {
    dispatch(removePackage(pkg.packageName));
  };

  const handleChangeSearchInput2 = (e) => {
    dispatch(setIsSelectedPackage(true));
    dispatch(setQuery2(e.target.value));
    debouncedSearch2(e.target.value);
    dispatch(setShowSuggestions(true));
  };

  return (
    <div className="search-input-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          value={queryData1}
          onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
        />
        <h2 className="vs-heading">Vs</h2>
        <input
          className="search-input"
          type="search"
          value={queryData2}
          onChange={handleChangeSearchInput2}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="search-button" type="submit">
          Compare
        </button>
      </form>

      {selectedPackages.length > 0 ? (
        <ul className="selected-packages-list">
          {selectedPackages.map((pkg, index) => (
            <li key={index} className="selected-package-item">
              {pkg.packageName}
              <CloseOutlined
                className="remove-icon"
                onClick={() => handleRemovePackage(pkg)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-packages-message">No packages selected.</p>
      )}
    </div>
  );
}

export default SearchInput;
