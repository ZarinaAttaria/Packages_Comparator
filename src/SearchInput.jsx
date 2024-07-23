import { useDispatch, useSelector } from "react-redux";
import { removePackage, setQuery } from "./slices/packagesDataSlice";
import _ from "lodash";
import { CloseOutlined } from "@ant-design/icons";

function SearchInput({ searchPackage, selectedPackages }) {
  const queryData = useSelector((state) => state.packages.query || "");
  const dispatch = useDispatch();
  const debouncedSearch = _.debounce(() => searchPackage(queryData), 500);

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
    debouncedSearch(queryData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch(queryData);
  };

  const handleRemovePackage = (pkg) => {
    dispatch(removePackage(pkg.packageName));
  };
  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2 searchInput"
          type="search"
          value={queryData}
          onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success search_Btn" type="submit">
          Compare
        </button>
      </form>

      {selectedPackages.length > 0 ? (
        <ul>
          {selectedPackages.map((pkg, index) => (
            <h6 key={index}>
              {pkg.packageName}
              <CloseOutlined onClick={() => handleRemovePackage(pkg)} />
            </h6>
          ))}
        </ul>
      ) : (
        <p>No packages selected.</p>
      )}
    </>
  );
}

export default SearchInput;
