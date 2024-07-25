import { useSelector } from "react-redux";

const Suggestions = ({ handleSelectedPackage }) => {
  const packageList = useSelector((state) => state.packages.packageList);
  const selectedPackages = useSelector(
    (state) => state.packages.selectedPackages
  );
  return (
    <>
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
    </>
  );
};

export default Suggestions;
