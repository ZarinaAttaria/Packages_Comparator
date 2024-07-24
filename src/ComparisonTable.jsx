import { Table } from "antd";
function ComparisonTable({ data }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "packageName",
      key: "packageName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Repository",
      dataIndex: "repository",
      key: "repository",
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} />;
}

export default ComparisonTable;
