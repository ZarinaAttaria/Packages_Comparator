import { Line } from "@ant-design/charts";

function DownloadsChart({ data }) {
  if (!Array.isArray(data)) {
    return null;
  }
  const config = {
    data,
    xField: "date",
    yField: "downloads",
    seriesField: "packageName",
    smooth: true,
    height: 400,
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return <Line {...config} />;
}

export default DownloadsChart;
