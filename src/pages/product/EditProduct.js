import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import EditProductForm from "../../components/product/EditProductForm";
function EditProduct() {
  return;
  <AdminLayout title="Edit Product">
    <Link to="/product">
      <Button variant="secondary ms-2">&lt; Go Back</Button>
    </Link>
    <EditProductForm />
  </AdminLayout>;
}

export default EditProduct;
