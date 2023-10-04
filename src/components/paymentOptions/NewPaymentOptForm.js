import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import slugify from "slugify";
import { storage } from "../../config/Firebase";
import { addPaymentOptionAction } from "../../redux/paymentOptions/paymentOptionAction";

function NewPaymentOptForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    status: "inactive",
  });

  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };
  const [uploadedFile, setUploadedFile] = useState([]);

  const handleOnImageAttached = (e) => {
    let { files } = e.target;
    setUploadedFile(files);
  };

  const handleFileUpload = async ({ 0: imgDetail }) => {
    const uniqueFileName = `${Date.now()}-${imgDetail.name}`;
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `paymentOptions/img/${uniqueFileName}`);

      const uploadTask = uploadBytesResumable(storageRef, imgDetail);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const slug = slugify(form.name, {
      lower: true,
      trim: true,
    });

    // Handle File Upload before saving to db
    const fileUrl = await handleFileUpload(uploadedFile);
    console.log("File url", fileUrl);
    const paymentObj = { ...form, slug, url: fileUrl };
    dispatch(addPaymentOptionAction(paymentObj));
    setForm({
      status: "inactive",
      name: "",
    });
  };
  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="border p-1 ms-1 me-1 shadow-lg"
      >
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
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Name"
                required
                name="name"
                value={form?.name}
                type="text"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                name="images"
                required
                onChange={handleOnImageAttached}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Button type="submit">Add New Payment Option</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewPaymentOptForm;
