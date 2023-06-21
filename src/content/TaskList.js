import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
const TaskList = () => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Completed At",
      dataIndex: "completed_at",
      key: "completed_at",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, { actions }) => (
        <>
          {actions.map((action) => {
            let color = action.length > 5 ? "geekblue" : "green";
            if (action === "delete") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={action}>
                {action.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      title: "Title 01",
      category: "Category01",
      status: "done",
      created_at: " 16-6-2000",
      completed_at: " 16-6-2000",
      actions: ["delete", "update", "view"],
    },
    {
      key: "2",
      title: "Title 02",
      category: "Category02",
      status: "done",
      created_at: " 16-6-2000",
      completed_at: " 16-6-2000",
      actions: ["delete", "update", "view"],
    },
    {
      key: "3",
      title: "Title 03",
      category: "Category03",
      status: "done",
      created_at: " 16-6-2000",
      completed_at: " 16-6-2000",
      actions: ["delete", "update", "view"],
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default TaskList;
