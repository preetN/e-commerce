import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProductTable from "../../components/product/ProductTable";
function Product() {
  return (
    <AdminLayout title="Product">
      <div className="text-end me-2">
        <Link to="/product/new">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <ProductTable />
    </AdminLayout>
  );
}

export default Product;
