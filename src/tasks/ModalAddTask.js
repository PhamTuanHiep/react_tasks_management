import { Modal, Table, Input, Select, Checkbox } from "antd";
import { useState } from "react";
import { store } from "../redux/store";
import { postTask } from "../services/apiService";
import { toast } from "react-toastify";
const ModalAddTask = (props) => {
  const { openModalAdd, setOpenModalAdd } = props;

  const CheckboxGroup = Checkbox.Group;
  const doLabelOptions = ["Done", "Doing", "Do Not"];
  const user = store.getState().user.account;

  const [checked, SetChecked] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    category: "",
    status: "",
    created: "",
    completed: "",
    userId: user.id,
  });

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Do you want to delete your current account ?"
  );

  const data = [
    {
      key: "",
      title: "",
      category: "",
      status: "",
      created_at: "",
      completed_at: "",
    },
  ];
  var selectOptions = [];
  for (let i = 1; i < 28; i++) {
    selectOptions.push({
      value: "category0" + i,
      label: "Category0" + i,
    });
  }
  const doOptions = ["Done", "Doing", "Do Not"];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: () => {
        return (
          <Input
            // defaultValue={ob.title}
            onChange={(e) => (newTask.title = e.target.value)}
          />
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: () => {
        return (
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={selectOptions}
            onSelect={(e) => (newTask.category = e)}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => {
        return (
          <CheckboxGroup
            className="check-box-group"
            options={doOptions}
            value={checked}
            onChange={handleCheckbox}
          />
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: () => {
        let d = new Date();
        newTask.created = `${d.getDate()}/${
          d.getMonth() + 1
        }/${d.getFullYear()}`;
        return (
          <label>
            {`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}
          </label>
        );
      },
    },
    {
      title: "Completed At",
      dataIndex: "completed_at",
      key: "completed_at",
      render: () => <label>--/--/----</label>,
    },
  ];
  const handleCheckbox = (list) => {
    SetChecked(list[0]);
    newTask.status = list[0] ? list[0] : "";
  };
  const handleOk = async () => {
    console.log("newTask:", newTask);
    let res = await postTask(newTask);
    if (res.status == 201) {
      toast.success("Task Created Successfully");
      await props.getTasks();
    }
    setNewTask({
      title: "",
      category: "",
      status: "",
      created: "",
      completed: "",
      userId: user.id,
    });
    setOpenModalAdd(false);
  };

  const handleCancel = () => {
    setOpenModalAdd(false);
  };
  return (
    <>
      <Modal
        width={820}
        title="Title"
        open={openModalAdd}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </Modal>
    </>
  );
};
export default ModalAddTask;
