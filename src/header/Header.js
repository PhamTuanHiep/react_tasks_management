import { Anchor } from "antd";
import { Menu, Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../redux/store";
import {
  HomeOutlined,
  UserSwitchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { doLogout } from "../redux/action/userAction";
const Header = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      label: (
        <NavLink to="/tasks" className="nav-link">
          Task List
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink to="/user/info" className="nav-link">
          User
        </NavLink>
      ),
    },
  ];

  var isAuthenticated = store.getState().user.isAuthenticated;
  const dispatch = useDispatch();
  const handleNav = (e) => {
    console.log("click ", e);
    sessionStorage.setItem("currentNav", e.key);

    // setCurrent(e.key);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogup = () => {
    dispatch(doLogout());
    sessionStorage.clear();
    navigate("/logup");
  };
  const handleLogOut = () => {
    dispatch(doLogout());
  };
  const items2 = [
    {
      label: (
        <NavLink to="user/info" className="nav-link">
          User Information
        </NavLink>
      ),
      key: "0",
    },
    {
      label: (
        <NavLink to="/logup" className="nav-link" onClick={handleLogup}>
          Register
        </NavLink>
      ),
      key: "1",
    },
    {
      label: (
        <NavLink to="/login" onClick={handleLogOut}>
          Logout
        </NavLink>
      ),

      key: "3",
    },
  ];

  return (
    <div className="header">
      <Menu
        className="nav"
        onClick={handleNav}
        selectedKeys={[
          sessionStorage.getItem("currentNav")
            ? sessionStorage.getItem("currentNav")
            : "1",
        ]}
        mode="horizontal"
        items={items}
      />
      {isAuthenticated === false ? (
        <div className="nav">
          <Button className="navBtn" type="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button className="navBtn" type="primary" onClick={handleLogup}>
            Logup
          </Button>
        </div>
      ) : (
        <div className="nav nav-setting">
          <Dropdown
            menu={{
              items: items2,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserSwitchOutlined />
                Account
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Header;
