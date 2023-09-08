import React, { useState } from "react";
import { auth, db } from "../../config/Firebase";
import { Form, Button, useAccordionButton } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
function Login() {
  const [form, setForm] = useState({});
  const custominput = [
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
  ];
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <>
      <Header />
      <div className="main">
        <Form
          className="login mt-5 p-5 border shadow-lg rounded"
          onSubmit={handleOnSubmit}
        >
          {custominput.map((input) => (
            <CustomInput onChange={handleOnChange} {...input} />
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
