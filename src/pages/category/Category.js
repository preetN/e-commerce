import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import NewCategoryForm from "./NewCategoryForm";
import CategoryTable from "./CategoryTable";

function Category() {
  return (
    <AdminLayout title="Category">
      Category
      <NewCategoryForm />
    </AdminLayout>
  );
}

export default Category;
