import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserDeleteOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Sider from "./sider/Sider";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;
const User = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default User;
