import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import videoHomepage from "./assets/videos/video-homepage.mp4";
import videoApp from "./assets/videos/backgroundvideo.mp4";
import "./App.scss";

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
      <Layout id="layout" className="layout">
        <Header id="header" />
        <Content id="content" style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <video autoPlay muted loop>
              <source src={videoApp} type="video/mp4" />
            </video>
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>
          </div>
        </Content>

        <Footer id="footer" style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

export default App;
