import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../redux/user/userAction";
import { useNavigate } from "react-router-dom";
function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.admin);
  useEffect(() => {
    admin?.uid && navigate("/dashboard");
  }, [admin, navigate]);
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(signInAction(form));
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
            <CustomInput
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              {...input}
            />
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
