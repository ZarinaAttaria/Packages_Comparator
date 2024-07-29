import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import _ from "lodash";
import {
  removePackage,
  setComparisonTable,
  setQuery,
  setShowSuggestions,
} from "./slices/packagesDataSlice";
import "./App.css";
import { Select } from "antd";

function SearchInput({
  searchPackage,
  selectedPackages,
  handleSelectedPackage,
}) {
  const queryData = useSelector((state) => state.packages.query || "");
  const packageList = useSelector((state) => state.packages.packageList);
  const dispatch = useDispatch();
  const debouncedSearch = _.debounce((query) => searchPackage(query), 300);

  const handleChange = (value) => {
    dispatch(setQuery(value));
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch(queryData);
    dispatch(setComparisonTable(true));
    dispatch(setShowSuggestions(false));
  };

  const handleRemovePackage = (pkg) => {
    dispatch(removePackage(pkg.packageName));
  };

  const handleSelect = (pkgName) => {
    handleSelectedPackage(pkgName);
  };

  const handleDeselect = (pkgName) => {
    dispatch(removePackage(pkgName));
  };

  const options = (packageList || []).map((pkg) => ({
    label: pkg.package.name,
    value: pkg.package.name,
  }));

  return (
    <div className="search-input-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          onSearch={handleChange}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
          options={options}
          showSearch
          searchValue={queryData}
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
