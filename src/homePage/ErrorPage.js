import { Checkbox, Divider } from "antd";
import { useState } from "react";
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];
const ErrorPage = () => {
  let d = new Date();
  console.log("d: ", d);
  console.log("typeof d: ", typeof d);

  // console.log("d.toUTCString():", d.toUTCString());
  console.log("typeof d.toUTCString():", typeof d.toUTCString());

  // console.log("d.toString():", d.toString());
  console.log("typeof d.toString():", typeof d.toString());
  console.log(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
  console.log(
    `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMinutes()}`
  );

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const onChange = (list) => {
    console.log(!!list);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <>
      <Checkbox
        // indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
};
export default ErrorPage;
