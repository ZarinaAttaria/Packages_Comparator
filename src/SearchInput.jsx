import { useDispatch, useSelector } from "react-redux";
import {
  removePackage,
  setIsSelectedPackage,
  setQuery1,
  setQuery2,
} from "./slices/packagesDataSlice";
import _ from "lodash";
import { CloseOutlined } from "@ant-design/icons";
function SearchInput({ searchPackage, selectedPackages }) {
  const queryData1 = useSelector((state) => state.packages.query1 || "");
  const queryData2 = useSelector((state) => state.packages.query2 || "");
  const dispatch = useDispatch();
  const debouncedSearch1 = _.debounce(() => searchPackage(queryData1), 500);
  const debouncedSearch2 = _.debounce(() => searchPackage(queryData2), 500);

  const handleChange = (e) => {
    dispatch(setQuery1(e.target.value));
    debouncedSearch1(queryData1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch1(queryData1);
    debouncedSearch2(queryData2);
  };
  const handleRemovePackage = (pkg) => {
    dispatch(removePackage(pkg.packageName));
  };
  const handleChangeSearchInput2 = (e) => {
    dispatch(setIsSelectedPackage(true));
    dispatch(setQuery2(e.target.value));
    debouncedSearch2(queryData2);
  };
  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2 searchInput"
          type="search"
          value={queryData1}
          onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
        />
        <h2 className="vs_heading">Vs</h2>

        <input
          className="form-control me-2 searchInput"
          type="search"
          value={queryData2}
          onChange={handleChangeSearchInput2}
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
