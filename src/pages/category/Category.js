import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import CategoryTable from "../../components/category/CategoryTable";
import NewCategoryForm from "../../components/category/NewCategoryForm";

function Category() {
  return (
    <AdminLayout title="Category">
      <NewCategoryForm />
      <CategoryTable />
    </AdminLayout>
  );
}

export default Category;
