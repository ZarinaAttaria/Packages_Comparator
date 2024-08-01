import React, { useState } from "react";
import "./App.css";
import { setDownloadsFilter } from "./slices/packagesDataSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

function DownloadsFilter() {
  const [filterName, setFilterName] = useState("1 week");
  const dispatch = useDispatch();

  const handleDownloadsFilter = (value) => {
    dispatch(setDownloadsFilter(value));
    console.log("Value:", value);
    switch (value) {
      case "last-month":
        setFilterName("1 month");
        break;
      case "last-year":
        setFilterName("1 year");
        break;

      case "2022-07-31:2024-07-31":
        setFilterName("2 years");
        break;
      case "2021-07-31:2024-07-31":
        setFilterName("3 years");
        break;
      case "2019-07-31:2024-07-31":
        setFilterName("5 years");
        break;
      case "2014-07-31:2024-07-31":
        setFilterName("All Time");
        break;
      case "2024-05-31:2024-07-31":
        setFilterName("2 months");
        break;
    }
  };
  const downloadsFilter = useSelector(
    (state) => state.packages.downloadsFilter
  );

  return (
    <>
      <div className="downloads-Filter">
        <h3>Downloads in past:</h3>

        <div className="dropdown ">
          <button
            className="btn btn-secondary dropdown-toggle filter_Dropdown"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {filterName}
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleDownloadsFilter("last-month")}
            >
              1 Month
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleDownloadsFilter("last-year")}
            >
              1 year
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                handleDownloadsFilter(
                  `${dayjs()
                    .subtract(2, "year")
                    .format("YYYY-MM-DD")}:${dayjs().format("YYYY-MM-DD")}`
                )
              }
            >
              2 years
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                handleDownloadsFilter(
                  `${dayjs()
                    .subtract(5, "year")
                    .format("YYYY-MM-DD")}:${dayjs().format("YYYY-MM-DD")}`
                )
              }
            >
              5 years
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                handleDownloadsFilter(
                  `${dayjs()
                    .subtract(3, "year")
                    .format("YYYY-MM-DD")}:${dayjs().format("YYYY-MM-DD")}`
                )
              }
            >
              3 years
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                handleDownloadsFilter(
                  `${dayjs()
                    .subtract(2, "month")
                    .format("YYYY-MM-DD")}:${dayjs().format("YYYY-MM-DD")}`
                )
              }
            >
              2 months
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                handleDownloadsFilter(
                  `${dayjs()
                    .subtract(10, "year")
                    .format("YYYY-MM-DD")}:${dayjs().format("YYYY-MM-DD")}`
                )
              }
            >
              All Time
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default DownloadsFilter;
