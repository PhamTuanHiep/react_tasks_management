import { Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./homePage/HomePage";
import TaskList from "./content/TaskList";
import Login from "./authen/Login";
import Logup from "./authen/Logup";
import User from "./user/User";
import UserInfo from "./user/userInfo/UserInfo";
import EditInfo from "./user/editInfo/EditInfo";
import DeleteUser from "./user/DeleteUser";
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
            <Route path="deldete_user" element={<DeleteUser />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/logup" element={<Logup />} />
      </Routes>
    </>
  );
};
export default Layout;
