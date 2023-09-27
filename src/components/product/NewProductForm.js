import React, { useState } from "react";
import { Form, Button, ProgressBar } from "react-bootstrap";
import { storage } from "../../config/Firebase";
import CustomInput from "../custominput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import slugify from "slugify";
import { addProductAction } from "../../redux/product/productAction";
function NewProductForm() {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  const [form, setForm] = useState({ status: "inactive" });
  const [uploadFiles, setUploadFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const slug = slugify(form.title, {
      lower: true,
      trim: true,
    });

    const urlPromises = uploadFiles.map((file) => handleFileUpload(file));
    const urls = await Promise.all(urlPromises);

    const prodObj = { ...form, slug, images: urls, thumbnail: urls[0] };
    console.log("i am saving value to db", prodObj);
    dispatch(addProductAction(prodObj));
  };
  const handleOnImageAttached = (e) => {
    let { files } = e.target;
    setUploadFiles([...files]);
  };
  const handleFileUpload = async (imgDetail) => {
    const uniqueFileName = `${Date.now()}-${imgDetail.name}`;
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `product/img/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imgDetail);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
  const inputFields = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "Mobile Phone",
      required: true,
    },
    {
      label: "Sku",
      name: "sku",
      type: "text",
      placeholder: "Ms-Disp",

      required: true,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "22",
      required: true,
    },
    {
      label: "Quantity",
      name: "qty",
      type: "number",
      placeholder: "99",
      required: true,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "99.99",
      required: true,
    },
    {
      label: "Sales Start from",
      name: "salesstartfrom",
      type: "date",
    },
    {
      label: "Sales End At",
      name: "salesendat",
      type: "date",
    },
    {
      label: "Product Description",
      name: "description",
      type: "text",
      as: "textarea",
      placeholder: "Mobile Phone",
      required: true,
      rows: 5,
    },
  ];
  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="border p-1 ms-1 me-1 shadow-lg"
      >
        {/* status s */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Status"
            name="status"
            onChange={handleOnChange}
          />
        </Form.Group>

        {/* Category dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select name="parentCategory" required onChange={handleOnChange}>
            <option>Open the select menu</option>
            {categoryList.map((category, i) => {
              return (
                <option value={category.slug} key={i}>
                  {category.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        {/* Other input fileds  */}
        {inputFields.map((item) => (
          <CustomInput {...item} onChange={handleOnChange} />
        ))}

        {/* Image Upload */}
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="images"
            multiple
            onChange={handleOnImageAttached}
          />
          <ProgressBar animated now={progress} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewProductForm;
