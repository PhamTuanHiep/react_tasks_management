import { Button, Modal, Table, Input } from "antd";
import { useState } from "react";

const AddTaskModal = (props) => {
  const open = props.open;
  const setOpen = props.setOpen;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Do you want to delete your current account ?"
  );
  const data = [
    {
      key: "1",
      title: "1",
      category: "1",
      status: "1",
      created_at: "1",
      completed_at: "1",
      actions: "1",
    },
  ];
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, ob) => {
        return (
          <Input
            defaultValue={ob.title}
            // bordered={false}
            // onChange={(e) => (newTask["title"] = e.target.value)}
          />
        );
      },
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
      title: (
        <div className="head-column">
          <label>Actions</label>
        </div>
      ),
      key: "actions",
      dataIndex: "actions",
    },
  ];

  const handleOk = () => {
    console.log("OK");
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
  };
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <div>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </Modal>
    </>
  );
};
export default AddTaskModal;
