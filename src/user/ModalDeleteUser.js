import { Button, Modal } from "antd";
import { useState } from "react";
import { store } from "../redux/store";
import { deleteUser } from "../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../redux/action/userAction";

const ModalDeleteUser = (props) => {
  const { open, setOpen } = props;
  const user = store.getState().user.account;
  const naviagtion = useNavigate();
  const dispath = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Do you want to delete your current account ?"
  );

  const handledDeleteUser = async () => {
    let res = await deleteUser(user.id);
    if (res.status === 200) {
      setOpen(false);
      toast.success("Successfully Deleted");
      setConfirmLoading(false);
      dispath(doLogout());
      naviagtion("/");
      // localStorage.removeItem(key);

      sessionStorage.clear();
    } else {
      toast.error("Delete Failed");
    }
  };
  const handleOk = () => {
    setModalText("Deleting account...");
    setConfirmLoading(true);
    handledDeleteUser();
  };
  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
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
      </Modal>
    </>
  );
};
export default ModalDeleteUser;
