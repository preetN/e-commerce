import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import { updateProfile } from "../../redux/user/userAction";
function Profile() {
  const [form, setForm] = useState({});
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    setForm(admin);
  }, [admin]);
  const dispatch = useDispatch();
  const inputFields = [
    {
      label: "First Name *",
      name: "fName",
      type: "text",
      placeholder: "Sam",
      required: true,
      value: form.fName,
    },
    {
      label: "Last Name *",
      name: "lName",
      type: "text",
      placeholder: "Sung",
      required: true,
      value: form.lName,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "043xxxx",
      value: form.phone,
    },
    {
      label: "Email *",
      name: "email",
      type: "email",
      placeholder: "abc@domain.com",
      required: true,
      disabled: true,
      value: form.email,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data", form);
    dispatch(updateProfile(form));
  };
  return (
    <AdminLayout title="Profile">
      <Form
        onSubmit={handleOnSubmit}
        className="login border p-5 shadow-lg rounded mt-3 mb-2"
      >
        {inputFields.map((item) => (
          <CustomInput {...item} onChange={handleOnChange} />
        ))}
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </AdminLayout>
  );
}

export default Profile;
