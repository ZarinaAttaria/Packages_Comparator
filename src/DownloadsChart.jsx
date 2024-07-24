import React from "react";
import { Line } from "@ant-design/charts";
import _ from "lodash";

const DownloadsChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    day: item.day,
    downloads: item.downloads,
    packageName: item.packageName,
  }));

  const config = {
    data: formattedData,
    xField: "day",
    yField: "downloads",
    seriesField: "packageName",
    xAxis: {
      title: {
        text: "Day",
        position: "end",
        offset: 0,
        spacing: 8,
        style: {
          fontSize: 11,
          fontWeight: 900,
          textAlign: "start",
        },
      },
      line: {
        style: {
          stroke: "black",
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
    color: ["#ff5556", "#a4e057"],
    legend: {
      position: "right",
      marker: {
        symbol: "square",
      },
      itemName: {
        formatter: (text, item, index) => {
          return text;
        },
      },
    },
  };

  return <Line {...config} />;
};

export default DownloadsChart;
