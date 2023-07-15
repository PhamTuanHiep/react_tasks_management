import { Button, Form, Input, InputNumber, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UploadImage from "./UploadImage";
import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import { patchUser } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";

const EditInfo = (props) => {
  const { stateEdit, setStateEdit } = props;
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
  /* eslint-enable no-template-curly-in-string */

  const [fileList, setFileList] = useState([]);
  const normFile = (e) => {
    // console.log("e.file.thumbUrl:", e);
    // console.log("e.file:", e.fileList);
    setFileList(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const user = store.getState().user.account;
    const newUser = {
      id: user.id,
      username: values.user.name,
      email: values.user.email,
      phone: values.user.phone,
      image: values.user.image[0].thumbUrl,
    };
    let dt = await patchUser(newUser);
    console.log("setSubmit");
    console.log("dt", typeof dt.status);
    if (dt.status === 200) {
      toast.success("Successfully updated");
      // reset user in local
      dispatch(doLogin(newUser));
      //clear Inputs
      form.resetFields();
      setStateEdit(true);
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div id="val-edit" className="validation-form">
      <div className="val val-title ">
        REGISTER
        <span>wellcom to My Web</span>
      </div>
      <Form
        form={form}
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
          label="Name"
          rules={[
            {
              required: true,
              message: "User Name only includes capital and ordinary words",
              pattern:
                /^([a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']+)((\s{1}[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']+)*$)/i,
            },
          ]}
        >
          <Input
            className="val-input"
            value={"poôp"}
            // onChange={(e) => setUsername(e.target.value)}
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
            // defaultValue={"oôoo"}
            allowClear={true}
            // status="warning"
            // onPressEnter={()=>onEnterPress()}
            // onChange={(e) => setEmail(e.target.value)}
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
            // onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          className="val-item"
          name={["user", "image"]}
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload listType="picture-card">
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
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
export default EditInfo;
