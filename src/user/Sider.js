import {
  EditOutlined,
  UserDeleteOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";
const Sider = (drops) => {
  const { Sider } = Layout;
  const { collapsed, setCollapsed } = drops;

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
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
            icon: <UserDeleteOutlined />,
            label: (
              <NavLink to="deldete_user" className="nav-link">
                Delete the account
              </NavLink>
            ),
          },
        ]}
      />
    </Sider>
  );
};
export default Sider;
