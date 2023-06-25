import {
  EditOutlined,
  UserDeleteOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Descriptions, Image } from "antd";
import { NavLink } from "react-router-dom";
import "./Sider.scss";

const Sider = (drops) => {
  const { Sider } = Layout;
  const { collapsed, setCollapsed } = drops;
  const user = {
    id: 2,
    username: "Nam",
    password: "12345",
    email: "user2@gmail.com",
    phone: "0123456788",
    image: {
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t200x200.jpg",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
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
      icon: <UserDeleteOutlined />,
      label: (
        <NavLink to="deldete_user" className="nav-link">
          Delete the account
        </NavLink>
      ),
    },
  ];
  return (
    <Sider id="sider" trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Image max-width={200} max-height={200} src={user.image.url} />
      <Menu
        className="menu"
        theme="dark"
        mode="vertical"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
  );
};
export default Sider;
