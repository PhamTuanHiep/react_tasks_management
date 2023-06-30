import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../action/userAction";
const INITIAL_STATE = {
  account: {
    username: "",
    password: "",
    email: "",
    phone: "",
    image: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        account: {
          id: action?.payload?.id,
          username: action?.payload?.username,
          password: action?.payload?.password,
          email: action?.payload?.email,
          phone: action?.payload?.phone,
          image: action?.payload?.image,
        },
        isAuthenticated: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          id: "",
          username: "",
          password: "",
          email: "",
          phone: "",
          image: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default userReducer;
