import React from "react";
import "./App.css";

function ComparisonTable({ data }) {
  console.log("ComparisonTable data:", data); // Debugging line

  return (
    <>
      <h3 className="comparison-heading">Comparison</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Repository</th>
            <th scope="col">Npm</th>
            <th scope="col">Homepage</th>
            <th scope="col">Stars</th>
            <th scope="col">Issues</th>
            <th scope="col">Version</th>

            <th scope="col">Size</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pkg, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{pkg.packageName || "N/A"}</td>
              <td>
                <a href={pkg.repository?.url || "#"}>
                  {pkg.repository || "N/A"}
                </a>
              </td>
              <td>
                <a href={pkg.npm || "#"}>{pkg.npm || "N/A"}</a>
              </td>
              <td>
                <a href={pkg.homepage || "#"}>{pkg.homepage || "N/A"}</a>
              </td>
              <td>{pkg.stars || "N/A"}</td>
              <td>{pkg.issues || "Unknown"}</td>
              <td>{pkg.version || "Unknown"}</td>

              <td>{pkg.size || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ComparisonTable;
