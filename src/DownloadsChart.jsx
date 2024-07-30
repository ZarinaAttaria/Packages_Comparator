import React from "react";
import { Line } from "@ant-design/charts";
import _ from "lodash";
import "./App.css";

const DownloadsChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    day: item.day,
    downloads: item.downloads,
    packageName: item.packageName,
  }));
  const colors = [
    "#00FF00",
    "#0000FF",
    "#FF0000",
    "#FFA500",
    "#800080",
    "#FFFF00",
    "#00FFFF",
    "#FFC0CB",
    "#808080",
    "#000000",
  ];

  const packageNames = [
    ...new Set(formattedData.map((item) => item.packageName)),
  ];
  const colorMap = {};
  packageNames.forEach((pkgName, index) => {
    colorMap[pkgName] = colors[index % colors.length];
  });

  console.log("Color Map:", colorMap);

  const config = {
    data: formattedData,
    xField: "day",
    yField: "downloads",
    seriesField: "packageName",
    color: ({ packageName }) => {
      console.log(
        "Assigning color for package:",
        packageName,
        "Color:",
        colorMap[packageName]
      );
      return colorMap[packageName];
    },

    lineStyle: ({ packageName }) => ({
      stroke: colorMap[packageName],
      lineWidth: 2,
    }),

    point: {
      size: 5,
      shape: "circle",
      style: ({ packageName }) => ({
        fill: colorMap[packageName],
        stroke: colorMap[packageName],
        lineWidth: 2,
      }),
    },

    xAxis: {
      title: {
        text: "Day",
        position: "end",
        offset: 0,
        spacing: 8,
        style: {
          fontSize: 12,
          fontWeight: "bold",
          textAlign: "center",
        },
      },
      line: {
        style: {
          stroke: "#000000",
        },
      },
      tickLine: {
        style: {
          stroke: "black",
        },
      },
      label: {
        style: {
          fill: "black",
        },
        formatter: (text) => {
          const oldLabel = text;
          const labelLength = oldLabel.replace(/[^x00-xff]/g, "xx").length;
          let newLabel = "";
          if (labelLength > 12) {
            let strLen = 0;
            let firstStr = "";
            let lastStr = "";
            for (let i = 0; i < labelLength; i++) {
              if (oldLabel.charCodeAt(i) > 128) {
                strLen += 2;
              } else {
                strLen++;
              }
              if (strLen <= 12) {
                firstStr += oldLabel.charAt(i);
              } else {
                lastStr += oldLabel.charAt(i);
              }
            }
            newLabel = `${firstStr}\n${lastStr}`;
          } else {
            newLabel = oldLabel;
          }
          return newLabel;
        },
      },
    },

    yAxis: {
      line: {
        style: {
          lineWidth: 2,
          stroke: "#00FF00",
        },
      },
      label: {
        style: {
          fill: "black",
        },
        offset: 15,
        formatter: (text) => _.round(_.divide(text, 1000), 2).toLocaleString(),
      },
    },

    legend: {
      position: "top",
    },

    smooth: true,
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Downloads Chart</h3>
      <Line {...config} />
    </div>
  );
};

export default DownloadsChart;
