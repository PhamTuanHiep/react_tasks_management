import {
  EditOutlined,
  UserDeleteOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Descriptions, Image, Button, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";
import { useState } from "react";

import "./Sider.scss";
import ModalDeleteUser from "../ModalDeleteUser";

const Sider = (drops) => {
  const { Sider } = Layout;
  const { collapsed, setCollapsed } = drops;
  const user = store.getState().user.account;

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Would you like to delete account ?"
  );

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("Account be deleting...");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <NavLink to="info" className="nav-link">
          User Information
        </NavLink>
      ),
    },
    {
      key: "2",
      icon: <EditOutlined />,
      label: (
        <NavLink to="edit_info" className="nav-link">
          Edit Information
        </NavLink>
      ),
    },
    {
      key: "3",
      icon: <SwapOutlined />,
      label: (
        <NavLink to="change_pass" className="nav-link">
          Change Password
        </NavLink>
      ),
    },
    {
      key: "4",
      icon: <UserDeleteOutlined />,
      label: (
        <a type="primary" onClick={showModal}>
          Delete Account
        </a>
      ),
    },
  ];
  return (
    <Sider id="sider" trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Image max-width={200} max-height={200} src={user.image} />
      <Menu
        className="menu"
        theme="dark"
        mode="vertical"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </Sider>
  );
};
export default Sider;
