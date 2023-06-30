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
export { getAllUsers, postNewUser, patchUser };
