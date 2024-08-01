import React from "react";
import { Line } from "@ant-design/plots";
import "./App.css";
import dayjs from "dayjs";
import DownloadsFilter from "./DownloadsFilter";

const DownloadsChart = ({ data, selectedPackages }) => {
  const groupByWeek = (data) => {
    if (!data || data.length === 0) return [];

    const packageGroups = data.reduce((acc, item) => {
      if (!acc[item.packageName]) {
        acc[item.packageName] = [];
      }
      acc[item.packageName].push(item);
      return acc;
    }, {});

    const weeklyData = [];

    Object.keys(packageGroups).forEach((packageName) => {
      let currentWeek = [];
      let currentWeekStart = dayjs(packageGroups[packageName][0].day).startOf(
        "week"
      );

      packageGroups[packageName].forEach((item) => {
        if (dayjs(item.day).isBefore(currentWeekStart.add(1, "week"))) {
          currentWeek.push(item);
        } else {
          const weekAverage =
            currentWeek.reduce((acc, curr) => acc + curr.downloads, 0) /
            currentWeek.length;
          weeklyData.push({
            day: currentWeekStart.toDate(),
            downloads: weekAverage,
            packageName: currentWeek[0].packageName,
          });
          currentWeekStart = currentWeekStart.add(1, "week");
          currentWeek = [item];
        }
      });

      if (currentWeek.length > 0) {
        const weekAverage =
          currentWeek.reduce((acc, curr) => acc + curr.downloads, 0) /
          currentWeek.length;
        weeklyData.push({
          day: currentWeekStart.toDate(),
          downloads: weekAverage,
          packageName: currentWeek[0].packageName,
        });
      }
    });

    return weeklyData;
  };

  const formattedData = groupByWeek(
    data.map((item) => ({
      day: new Date(item.day),
      downloads: item.downloads,
      packageName: item.packageName,
    }))
  );

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
        text: "Week",
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
    axis: {
      y: {
        labelFormatter: (text) => {
          const value = Number(text);
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
          } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
          } else {
            return value.toString();
          }
        },
      },
    },
    smooth: true,
    lineStyle: {
      lineWidth: 2,
    },
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Downloads Chart</h3>
      {selectedPackages.length > 0 ? <DownloadsFilter /> : ""}

      <Line {...config} />
    </div>
  );
};

export default DownloadsChart;
