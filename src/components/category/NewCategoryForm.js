import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import slugify from "slugify";
import { addCategoryAction } from "../../redux/category/categoryAction";
function NewCategoryForm() {
  const [form, setForm] = useState({ status: "inactive" });
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "name") {
      setForm({ ...form, [name]: value });
    } else if (name === "status") {
      setForm({ ...form, [name]: checked ? "active" : "inactive" });
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const slug = slugify(form.name, {
      lower: true,
      trim: true,
    });
    const catObj = { ...form, slug };
    dispatch(addCategoryAction(catObj));
  };

  return (
    <Form className="border p-5 ms-1 me-1 shadow-lg" onSubmit={handleOnSubmit}>
      <Row>
        <Col md="2">
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Status"
              name="status"
              onChange={handleOnChange}
            />
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              label="name"
              name="name"
              onChange={handleOnChange}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Button type="submit">Add Category</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default NewCategoryForm;
