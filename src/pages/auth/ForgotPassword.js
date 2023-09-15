import React, { useState } from "react";
import CustomInput from "../../components/custominput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const custominput = {
    label: "Email",
    placeholder: "Your Email",
    type: "email",
    name: "email",
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, form)
      .then((res) => {
        toast.success("Reset successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <Form className="login mt-5 p-5 border shadow-lg rounded">
        <CustomInput
          {...custominput}
          onChange={(e) => setForm(e.target.value)}
        />
        <Button type="submit" onClick={handleOnClick}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ForgotPassword;
