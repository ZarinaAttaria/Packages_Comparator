import React from "react";
import "./App.css";

function ComparisonTable({ data }) {
  if (!Array.isArray(data)) {
    console.error("Data is not an array or is undefined", data);
    return <div>Invalid data</div>;
  }

  return (
    <>
      <h3 className="comparison-heading">Comparison</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Repository</th>
            <th scope="col">Last Modified Date</th>
            <th scope="col">Authors/Publishers</th>
            <th scope="col">Maintainers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pkg, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{pkg.packageName || "N/A"}</td>
              <td>{pkg.description || "N/A"}</td>
              <td>
                <a href={pkg.repository?.url || "#"}>
                  {pkg.repository || "N/A"}
                </a>
              </td>
              <td>{pkg.date || "N/A"}</td>
              <td>{pkg.publisher || "Unknown"}</td>
              <td>{pkg.maintainers || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ComparisonTable;
