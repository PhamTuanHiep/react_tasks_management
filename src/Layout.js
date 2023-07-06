import { Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./homePage/HomePage";
import TaskList from "./tasks/TaskList";
import Login from "./authen/Login";
import Logup from "./authen/Logup";
import User from "./user/User";
import UserInfo from "./user/userInfo/UserInfo";
import EditInfo from "./user/editInfo/EditInfo";
import ChangePass from "./user/ChangePass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./homePage/ErrorPage";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="user" element={<User />}>
            <Route path="info" element={<UserInfo />} />
            <Route path="edit_info" element={<EditInfo />} />
            <Route path="change_pass" element={<ChangePass />} />
          </Route>
        </Route>

        <Route path="/error" element={<ErrorPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logup" element={<Logup />} />
      </Routes>
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
    </>
  );
};
export default Layout;
