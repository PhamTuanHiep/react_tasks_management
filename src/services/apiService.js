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
export { getAllUsers, postNewUser };
