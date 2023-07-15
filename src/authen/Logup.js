import { Button, Form, Input, InputNumber } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import "./Logup.scss";
import { useState } from "react";
import { postNewUser } from "../services/apiService";
import { toast } from "react-toastify";
const Logup = () => {
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
    // required: "'${label}' is required",
    required: "'${label}' cannot be empty",

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
  /* eslint-enable no-template-curly-in-string */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let data = await postNewUser(username, password, email, phone, image);
    if (data.status === 201) {
      toast.success("Successful account registration");
      navigate("/");
    } else {
      toast.error("Account registration failed");
    }
  };
  return (
    <div id="val-logup" className="validation-form">
      <div className="val val-title ">
        REGISTER
        <span className="val-note">wellcom to My Web</span>
      </div>
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
          name={["user", "name"]}
          value="Ahih"
          label="Name"
          rules={[
            {
              required: true,
              type: "string",
              // min: 3,
              message: "User Name only includes capital and ordinary words",
              pattern:
                /^([a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']+)((\s{1}[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']+)*$)/i,
            },
          ]}
        >
          <Input
            className="val-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="val-item"
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              required: true,
              message: "Email is valid",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]{2,}(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
          ]}
        >
          <Input
            className="val-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="val-item"
          name={["user", "phone"]}
          label="Phone"
          rules={[
            {
              required: true,
              type: "string",
              message: "Number phone is valid",
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            },
          ]}
        >
          <Input
            className="val-input"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="val-item"
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message:
                "The password must have 8-32 characters, at least 1 capital and 1 normal word !",
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/g,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            className="val-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="val-item"
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
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
        <span className="gohome">
          <NavLink to="/" className="nav-link">
            Go Home
          </NavLink>
        </span>
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
      </Form>
    </div>
  );
};
export default Logup;
