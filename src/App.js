import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => {
  console.log(theme.useToken().token.colorBgContainer);
  const { Content, Footer } = Layout;
  // const getData = async () => {
  //   try {
  //     let data = await axios.get("http://localhost:3001/users");
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // getData().then((data) => {
  //   console.log("data", data);
  // });
  // const postData = async () => {
  //   try {
  //     let data = await axios.post("http://localhost:3001/users", {
  //       username: "Thuong",
  //       password: "12345",
  //       email: "user4@gmail.com",
  //       phone: "0123456782",
  //       taskId: 2,
  //     });
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // postData().then((data) => {
  //   console.log(data);
  // });

  return (
    <>
      <Layout className="layout">
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
      </Layout>
    </>
  );
};

export default App;
