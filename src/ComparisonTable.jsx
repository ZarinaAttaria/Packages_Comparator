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
    {
      title: "Last Modified Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Authors/Publishers",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "Maintainers",
      dataIndex: "maintainers",
      key: "maintainers",
    },
  ];

  return (
    <>
      <h3>Comparison</h3>
      <Table dataSource={data} columns={columns} pagination={false} />
    </>
  );
}

export default ComparisonTable;
