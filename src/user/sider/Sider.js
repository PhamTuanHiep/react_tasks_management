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
  const [currentMenu, setCurrentMenu] = useState("1");
  const showModal = () => {
    setOpen(true);
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
  const handleClickMenu = (e) => {
    if (e.key != "4") {
      sessionStorage.setItem("currentMenu", e.key);
    }
  };
  console.log("open:", open);
  return (
    <Sider id="sider" trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />

      <Image
        className="img-sider"
        max-width={200}
        max-height={200}
        src={
          user.image
            ? user.image
            : "https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg"
        }
        alt="avatar "
      />
      <Menu
        className="menu"
        theme="dark"
        mode="vertical"
        defaultSelectedKeys={[
          sessionStorage.getItem("currentMenu")
            ? sessionStorage.getItem("currentMenu")
            : "1",
        ]}
        items={items}
        onClick={(e) => handleClickMenu(e)}
      />
      <ModalDeleteUser open={open} setOpen={setOpen} />
    </Sider>
  );
};
export default Sider;
