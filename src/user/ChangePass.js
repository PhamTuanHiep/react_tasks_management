import { Button, Form, Input, InputNumber, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { store } from "../redux/store";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../redux/action/userAction";
import { patchPassUser } from "../services/apiService";

const ChangePass = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  /* eslint-disable no-template-curly-in-string */
  const typeTemplate = "'${label}' is not a valid ${type}";

  const validateMessages = {
    default: "Validation error on field '${label}'",
    required: "'${label}' is required",
    enum: "'${label}' must be one of [${enum}]",
    whitespace: "'${label}' cannot be empty",
    date: {
      format: "'${label}' is invalid for format date",
      parse: "'${label}' could not be parsed as date",
      invalid: "'${label}' is invalid date",
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      boolean: typeTemplate,
      integer: typeTemplate,
      float: typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate,
    },
    string: {
      len: "'${label}' must be exactly ${len} characters",
      min: "'${label}' must be at least ${min} characters",
      max: "'${label}' cannot be longer than ${max} characters",
      range: "'${label}' must be between ${min} and ${max} characters",
    },
    number: {
      len: "'${label}' must equal ${len}",
      min: "'${label}' cannot be less than ${min}",
      max: "'${label}' cannot be greater than ${max}",
      range: "'${label}' must be between ${min} and ${max}",
    },
    array: {
      len: "'${label}' must be exactly ${len} in length",
      min: "'${label}' cannot be less than ${min} in length",
      max: "'${label}' cannot be greater than ${max} in length",
      range: "'${label}' must be between ${min} and ${max} in length",
    },
    pattern: {
      mismatch: "'${label}' does not match pattern ${pattern}",
    },
  };

  const [fileList, setFileList] = useState([]);
  const normFile = (e) => {
    setFileList(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const dispatch = useDispatch();

  const user = store.getState().user.account;
  const onFinish = async (values) => {
    if (user.password === values.user.password) {
      const newUser = {
        ...user,
        password: values.user.newPassword,
      };
      let res = await patchPassUser(newUser);
      if (res.status === 200) {
        dispatch(doLogin(newUser));
        toast.success("Successfully Changed Password");
      }
    } else {
    }
  };

  return (
    <div id="val-edit" className="validation-form">
      <div className="val val-title ">Change Password :</div>
      <Form
        className="val val-form "
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        layout="vertical"
      >
        <Form.Item
          className="val-item"
          name={["user", "password"]}
          label="Password"
          rules={[
            {
              required: true,
              message: "",
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/g,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || user.password === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Current password is not correct!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password className="val-input" />
        </Form.Item>
        <Form.Item
          className="val-item"
          name={["user", "newPassword"]}
          label="New Password"
          rules={[
            {
              required: true,
              message:
                "Password must have 8 to 32 characters including both lowercase and uppercase letters",
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/g,
            },
          ]}
          hasFeedback
        >
          <Input.Password className="val-input" />
        </Form.Item>
        <Form.Item
          className="val-item"
          name={["user", "confirmChange"]}
          label="Confirm New Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue(["user", "newPassword"]) === value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="val-input" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button className="val-submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {/* <Image max-width={200} max-height={200} src={img} /> */}
      </Form>
    </div>
  );
};
export default ChangePass;
