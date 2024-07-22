import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "./slices/packagesDataSlice";

function SearchInput({ searchPackage, selectedPackages }) {
  const queryData = useSelector((state) => state.packages.query || "");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPackage(queryData);
  };

  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          value={queryData}
          onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success search_Btn" type="submit">
          Search
        </button>
      </form>

      {selectedPackages.length > 0 ? (
        <ul>
          {selectedPackages.map((pkg, index) => (
            <h6 key={index}>{pkg}</h6>
          ))}
        </ul>
      ) : (
        <p>No packages selected.</p>
      )}
    </>
  );
}

export default SearchInput;
