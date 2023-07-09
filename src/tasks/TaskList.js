import {
  Space,
  Table,
  Tag,
  Pagination,
  Input,
  Button,
  Select,
  Checkbox,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { store } from "../redux/store";
import { useEffect, useState } from "react";
import { getUserTasks, patchTask } from "../services/apiService";
import "./TaskList.scss";
import { toast } from "react-toastify";
import ModalAddTask from "./ModalAddTask";
import ModalDeleteTask from "./ModalDeleteTask";

const TaskList = () => {
  const [inputValue, setInputValue] = useState("");
  const [cateValue, setCateValue] = useState("");
  const [numUpdate, setNumUpdate] = useState("");
  const [numDelete, setNumDelete] = useState("");

  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      title: "Title 01",
      category: "Category01",
      status: "done",
      created_at: " 16-6-2000",
      completed_at: " 16-6-2000",
      actions: ["delete", "update", "view"],
    },
  ]);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const CheckboxGroup = Checkbox.Group;
  const doOptions = ["Done", "Doing", "Do Not"];
  const [checked, SetChecked] = useState("");
  const [newTask, setNewTask] = useState({});
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const columns = [
    {
      title: (
        <div className="head-column">
          <label>Search Title</label>
          <Input
            className="head-column_input"
            placeholder="Search Title"
            value={inputValue}
            onChange={(e) => {
              const currValue = e.target.value;
              setInputValue(currValue);
              setCateValue("");

              const filteredData = defaultTasks.filter((entry) => {
                return entry.title.includes(currValue);
              });

              setData(filteredData);
            }}
          />
        </div>
      ),
      dataIndex: "title",
      key: "title",
      render: (text, ob) => {
        return ob.key === numUpdate ? (
          <Input
            defaultValue={ob.title}
            // bordered={false}
            onChange={(e) => (newTask["title"] = e.target.value)}
          />
        ) : (
          <label>{text}</label>
        );
      },
    },
    {
      title: (
        <div className="head-column">
          <label>Search Category</label>
          <Input
            className="head-column_input"
            placeholder="Search Title"
            value={cateValue}
            onChange={(e) => {
              const currValue = e.target.value;
              setCateValue(currValue);
              setInputValue("");
              const filteredData = defaultTasks.filter((entry) => {
                return entry.category.includes(currValue);
              });

              setData(filteredData);
            }}
          />
        </div>
      ),
      dataIndex: "category",
      key: "category",
      render: (text, ob) => {
        return ob.key === numUpdate ? (
          <Select
            showSearch
            style={{
              width: 200,
            }}
            defaultValue={ob.category}
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
            onSelect={(e) => (newTask["category"] = e)}
          />
        ) : (
          <label>{text}</label>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, ob) => {
        // console.log("ob: ", ob);
        return ob.key === numUpdate ? (
          <CheckboxGroup
            className="check-box-group"
            options={doOptions}
            // defaultValue={ob.status}
            value={checked ? checked : ob.status}
            onChange={handleCheckbox}
          />
        ) : (
          <label>{text}</label>
        );
      },
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
      render: (text, ob) => {
        if (ob.key === numUpdate) {
          let d = new Date();
          if (checked === "Done") {
            newTask["completed"] = `${d.getDate()}/${
              d.getMonth() + 1
            }/${d.getFullYear()}`;
            return (
              <label>
                {`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}
              </label>
            );
          } else {
            newTask["completed"] = "--/--/----";
            return <label>--/--/----</label>;
          }
        } else {
          return <label>{text}</label>;
        }
      },
    },
    {
      title: (
        <div className="head-column">
          <label>Actions</label>
          <Button
            className="head-column_button"
            type="primary"
            onClick={() => handleAddTask()}
          >
            <PlusOutlined />
            <label>Add Task</label>
          </Button>
        </div>
      ),
      key: "actions",
      dataIndex: "actions",
      render: (id, ob) => {
        return id == numUpdate ? (
          <div className="actions">
            <Button type="primary" onClick={(e) => handleUpdateSubmit(e)}>
              Submit
            </Button>
            <Button
              type="primary"
              danger
              onClick={(e) => handleCancelSubmit(e)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="actions">
            <Button
              type="primary"
              danger
              onClick={(e) => handleDeleteTask(e, id)}
            >
              Delete
            </Button>
            <Button type="primary" onClick={(e) => handleUpdateTask(e, id)}>
              Update
            </Button>
          </div>
        );
      },
    },
  ];
  const selectOptions = [];
  for (let i = 1; i < 28; i++) {
    selectOptions.push({
      value: "category0" + i,
      label: "Category0" + i,
    });
  }
  const user = store.getState().user.account;

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    let res = await getUserTasks(user.id);
    // console.log(res.data);

    if (res.status === 200) {
      var tasks = res.data.map((task) => {
        return {
          key: task.id,
          title: task.title,
          category: task.category,
          status: task.status,
          created_at: task.created,
          completed_at: task.completed,
          actions: task.id,
        };
      });
      setData(tasks);
      setDefaultTasks(tasks);
      // console.log(datas);
    }
  };
  const handleCheckbox = (list) => {
    console.log("list:", list[0]);
    SetChecked(list[0]);
    console.log("checked:", checked);

    newTask["status"] = list[0] ? list[0] : checked;
  };
  const handleDeleteTask = (e, id) => {
    // console.log(e.target);
    // console.log("id:", id);
    setNumDelete(id);
    setOpenModalDelete(true);
  };
  const handleUpdateTask = (e, idItem) => {
    setNumUpdate(idItem);
    setNewTask({ id: idItem });
  };
  const handleAddTask = () => {
    setOpenModalAdd(true);
  };

  const handleUpdateSubmit = async (e) => {
    console.log("newTask:", newTask);
    setSubmitUpdate(true);
    let res = await patchTask(newTask);
    console.log("res:", res);
    if (res.status == 200) {
      toast.success("completely succed");
      getTasks();
    }
    setNumUpdate("");
    setNewTask({});
  };
  const handleCancelSubmit = () => {
    setNumUpdate("");
    setNewTask({});
  };
  return (
    <div id="tasks">
      <Table
        className="table-tasks"
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomCenter"],
          defaultCurrent: 1,
          defaultPageSize: 6,
          showSizeChanger: false,
          // pageSizeOptions: ["5", "10", "20", "30"],
        }}
      />
      <ModalAddTask
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
        getTasks={getTasks}
      />
      <ModalDeleteTask
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        getTasks={getTasks}
        numDelete={numDelete}
      />
    </div>
  );
};

export default TaskList;
