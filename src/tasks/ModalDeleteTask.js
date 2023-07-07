import { Button, Modal } from "antd";
import { useState } from "react";
import { store } from "../redux/store";
import { deleteTask, deleteUser } from "../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../redux/action/userAction";

const ModalDeleteTask = (props) => {
  const { numDelete, openModalDelete, setOpenModalDelete } = props;

  const user = store.getState().user.account;
  const naviagtion = useNavigate();
  const dispath = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Do you want to delete your this task ?"
  );

  const handledDeleteUser = () => {};
  const handleOk = async () => {
    let res = await deleteTask(numDelete);
    if (res.status === 200) {
      toast.success("Task Deleted Successfully");
      await props.getTasks();
      setOpenModalDelete(false);
    }
  };
  const handleCancel = () => {
    setOpenModalDelete(false);
  };
  return (
    <>
      <Modal
        title="Delete this task"
        open={openModalDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
export default ModalDeleteTask;
