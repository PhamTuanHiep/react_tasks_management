import axios from "axios";
const getAllUsers = () => {
  return axios.get("http://localhost:3001/users");
};
const postNewUser = (username, password, email, phone, image) => {
  const data = {
    username,
    password,
    email,
    phone,
    image,
  };
  return axios.post("http://localhost:3001/users", data);
};
const patchUser = ({ id, ...rest }) => {
  // const data = {
  //   username,
  //   email,
  //   phone,
  //   image,
  // };
  return axios.patch(`http://localhost:3001/users/${id}`, rest);
};
const deleteUser = (id) => {
  return axios.delete(`http://localhost:3001/users/${id}`);
};
const patchPassUser = ({ id, ...rest }) => {
  return axios.patch(`http://localhost:3001/users/${id}`, rest);
};
const getUserTasks = (id) => {
  return axios.get(`http://localhost:3001/tasks/?userId=${id}`);
};
const patchTask = ({ id, ...rest }) => {
  return axios.patch(`http://localhost:3001/tasks/${id}`, rest);
};
const postTask = ({ ...rest }) => {
  return axios.post("http://localhost:3001/tasks", rest);
};
const deleteTask = (id) => {
  return axios.delete(`http://localhost:3001/tasks/${id}`);
};
export {
  getAllUsers,
  postNewUser,
  patchUser,
  deleteUser,
  patchPassUser,
  getUserTasks,
  patchTask,
  postTask,
  deleteTask,
};
