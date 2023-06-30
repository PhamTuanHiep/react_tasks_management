import { Descriptions } from "antd";
import { Image } from "antd";
import { store } from "../../redux/store";
import "./UserInfo.scss";
const UserInfo = (props) => {
  // console.log("props:", props);
  // var user = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root")).user
  // ).account;
  const user = store.getState().user.account;
  // const user = {
  //   id: 2,
  //   username: "Nam",
  //   password: "12345",
  //   email: "user2@gmail.com",
  //   phone: "0123456788",
  //   image: {
  //     title: "reprehenderit est deserunt velit ipsam",
  //     url: "https://via.placeholder.com/600/771796",
  //     thumbnailUrl: "https://via.placeholder.com/150/771796",
  //   },
  // };
  return (
    <div className="user-info">
      <Descriptions className="des2" title="User Info" layout="vertical">
        <Descriptions.Item label="UserName" span={3}>
          {user.username}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone" span={3}>
          {user.phone}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default UserInfo;
