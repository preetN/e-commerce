import React, { useEffect, useState } from "react";
import { Form, Button, ProgressBar } from "react-bootstrap";
import { storage } from "../../config/Firebase";
import CustomInput from "../custominput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addProductAction,
  deleteProductAction,
} from "../../redux/product/productAction";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { categoryList } = useSelector((state) => state.category);
  const { productList } = useSelector((state) => state.product);
  const [form, setForm] = useState({ status: "inactive" });
  const [uploadFiles, setUploadFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imgToRemove, setImgToRemove] = useState([]);
  useEffect(() => {
    const prodInfo = productList.find((p) => p.slug == slug);
    if (!prodInfo) {
      return navigate("/product");
    }
    setForm(prodInfo);
  }, [slug, productList]);
  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    if (name === "thumbnail") {
      if (imgToRemove.includes(value)) {
        return alert("Thumbnail can't be deleted, change the thumbnail first");
      }
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (imgToRemove.includes(form.thumbnail)) {
      return alert("You can't delete thumbnail");
    }

    const urlPromises = uploadFiles.map((file) => handleFileUpload(file));
    const urls = await Promise.all(urlPromises);
    const filteredList = form.images.filter(
      (img) => !imgToRemove.includes(img)
    );
    const finalImgList = [...filteredList, ...urls];
    const prodObj = { ...form, slug, images: finalImgList };
    console.log("I am saving value to db", prodObj);
    dispatch(addProductAction(prodObj));
  };
  const handleOnImageAttached = (e) => {
    let { files } = e.target;
    setUploadFiles([...files]);
  };
  const selectOnImgDelete = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setImgToRemove([...imgToRemove, value]);
    } else {
      const filteredRemoveList = imgToRemove.filter((img) => img !== value);
      setImgToRemove(filteredRemoveList);
    }
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
  const handleOnDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAction(slug));
    }
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
      label: "Slug",
      name: "slug",
      type: "text",
      required: true,
      value: form.slug,
      disabled: true,
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
    <Form onSubmit={handleOnSubmit} className="border p-1 ms-1 me-1 shadow-lg">
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

      {form?.images?.length > 0 &&
        form?.images?.map((img) => (
          <div>
            <div>
              <input
                type="radio"
                id="thumbnail"
                name="thumbnail"
                value={img}
                checked={img === form.thumbnail}
                onChange={handleOnChange}
              />
              <label htmlFor="thumbnail">Thumbnail</label>
            </div>
            <img src={img} width="150px" />
            <div>
              <Form.Check
                label="Delete"
                value={img}
                onChange={selectOnImgDelete}
              />
            </div>
          </div>
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
        Update
      </Button>
      <div className="mt-2">
        <Button variant="danger" onClick={handleOnDelete}>
          Delete
        </Button>
      </div>
    </Form>
  );
}

export default EditProductForm;
