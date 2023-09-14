import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import CustomInput from "../../components/custominput/CustomInput";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signUpAction } from "../../redux/user/userAction";

function Signup() {
  const [form, setForm] = useState({});
  const custominput = [
    {
      label: "First Name",
      placeholder: "Your first name",
      type: "text",
      name: "fname",
    },
    {
      label: "Last Name",
      placeholder: "Your Last Name",
      type: "text",
      name: "lname",
    },
    {
      label: "Phone no",
      placeholder: "Phone number",
      type: "number",
      name: "phno",
    },
    {
      label: "Email",
      placeholder: "Your Email",
      type: "email",
      name: "email",
    },
    {
      label: "Password",
      placeholder: "***********",
      type: "password",
      name: "password",
    },
    {
      label: "Confirm Password",
      placeholder: "***********",
      type: "password",
      name: "cpassword",
    },
  ];
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpAction(form));
  };
  return (
    <AdminLayout title="Register">
      <Form
        className="login mt-5 p-5 border shadow-lg rounded"
        onSubmit={handleOnSubmit}
      >
        {custominput.map((input, i) => (
          <CustomInput
            {...input}
            key={i}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        ))}
        <Button type="submit">Register</Button>
      </Form>
    </AdminLayout>
  );
}

export default Signup;
