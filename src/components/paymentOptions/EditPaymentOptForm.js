import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../config/Firebase";
import {
  addPaymentOptionAction,
  deletePaymentOptionAction,
} from "../../redux/paymentOptions/paymentOptionAction";
import { setModalShow } from "../../redux/systemState/systemSlice";
function EditPaymentOptForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    status: "inactive",
  });

  const { selectedPayment } = useSelector((state) => state.paymentOption);

  useEffect(() => {
    setForm(selectedPayment);
  }, [selectedPayment]);

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
    // Handle File upload, set the new url and then pass the obj
    let url;
    if (uploadedFile) {
      url = await handleFileUpload(uploadedFile);
    }
    let newObj = form;
    if (url) {
      newObj = { ...form, url };
    }
    dispatch(addPaymentOptionAction(newObj));
    dispatch(setModalShow(false));
  };

  const handleOnDelete = () => {
    dispatch(deletePaymentOptionAction(form.slug));
  };

  const handleImRemove = () => {
    setForm({
      ...form,
      url: "",
    });
  };
  const [uploadedFile, setUploadedFile] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOnImageAttached = (e) => {
    let { files } = e.target;
    const file = files[0];
    setUploadedFile(files);
    if (file) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="border p-1 ms-1 me-1 shadow-lg"
      >
        <Row>
          <Col md="3">
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Status"
                name="status"
                checked={form.status === "active"}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                value={form.name}
                required
                name="name"
                type="text"
                onChange={handleOnChange}
              />
              <Form.Label>{`Slug: ${form.slug}`}</Form.Label>
            </Form.Group>
          </Col>
          {form.url && form.url !== "" ? (
            <Col md="5">
              <div className="p-2 border">
                <img src={form.url} width={"150px"} />
              </div>
              <BsFillTrashFill
                role="button"
                style={{
                  color: "red",
                }}
                onClick={handleImRemove}
              />
            </Col>
          ) : (
            <Col md="5">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  name="images"
                  required
                  onChange={handleOnImageAttached}
                />
              </Form.Group>
            </Col>
          )}
          <Col md="3">
            <Button type="submit">Update</Button>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2 d-grid">
            <Button variant="danger" onClick={handleOnDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditPaymentOptForm;
