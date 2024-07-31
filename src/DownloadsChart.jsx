import React from "react";
import { Line } from "@ant-design/plots";
import "./App.css";

const DownloadsChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    day: new Date(item.day),
    downloads: item.downloads,
    packageName: item.packageName,
  }));

  const config = {
    data: formattedData,
    xField: "day",
    yField: "downloads",
    seriesField: "packageName",
    colorField: "packageName",
    legend: {
      position: "top",
    },
    xAxis: {
      title: {
        text: "Day",
        position: "end",
        offset: 0,
        style: {
          fontSize: 12,
          fontWeight: "bold",
          textAlign: "center",
        },
      },
      label: {
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
      label: {
        formatter: (text) => {
          const value = Number(text);
          return value
            .toLocaleString("en-US")
            .replace(/(\d)(?=(\d{3})+$)/g, "$1,");
        },
      },
    },
    smooth: true,
    lineStyle: {
      lineWidth: 2,
    },
    point: {
      size: 5,
      shape: "circle",
    },
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Downloads Chart</h3>
      <Line {...config} />
    </div>
  );
};

export default DownloadsChart;
