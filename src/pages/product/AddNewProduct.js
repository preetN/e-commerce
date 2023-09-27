import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NewProductForm from "../../components/product/NewProductForm";
function AddNewProduct() {
  return (
    <AdminLayout title="AddProduct">
      <Link to="/product">
        <Button variant="secondary ms-2">&lt; Go Back</Button>
      </Link>
      <NewProductForm />
    </AdminLayout>
  );
}

export default AddNewProduct;
