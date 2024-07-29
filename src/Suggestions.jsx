import { useSelector } from "react-redux";
import "./App.css";

const Suggestions = ({ handleSelectedPackage }) => {
  const packageList = useSelector((state) => state.packages.packageList);
  const selectedPackages = useSelector(
    (state) => state.packages.selectedPackages
  );
  const showSuggestions = useSelector(
    (state) => state.packages.showSuggestions
  );
  
  return (
    <div className="suggestions-container">
      {packageList && packageList.length > 0 && showSuggestions ? (
        <ul className="list-group">
          {packageList.map((pkg, index) => (
            <li
              key={index}
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
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Suggestions;
