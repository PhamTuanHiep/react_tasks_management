import { Anchor } from "antd";
import { Menu, Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  SettingOutlined,
  UserSwitchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./Header.scss";
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
      icon: <SettingOutlined />,
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
  // const [current, setCurrent] = useState("1");
  // useEffect(() => {
  //   sessionStorage.getItem("currentNav")
  //     ? setCurrent(sessionStorage.getItem("currentNav"))
  //     : true;
  // }, []);

  const handleNav = (e) => {
    console.log("click ", e);
    sessionStorage.setItem("currentNav", e.key);

    // setCurrent(e.key);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogup = () => {
    navigate("/logup");
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
        <NavLink to="/logup" className="nav-link">
          Register
        </NavLink>
      ),
      key: "1",
    },
    {
      label: "Logout",
      key: "3",
    },
  ];
  var varbole = false;
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
      {varbole === false ? (
        <div className="nav">
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button type="primary" onClick={handleLogup}>
            Logup
          </Button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Header;
