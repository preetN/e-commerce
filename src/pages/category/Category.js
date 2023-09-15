import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import NewCategoryForm from "./NewCategoryForm";

function Category() {
  return (
    <AdminLayout title="Category">
      Category
      <NewCategoryForm />
    </AdminLayout>
  );
}

export default Category;
