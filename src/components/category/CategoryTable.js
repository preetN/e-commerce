import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { setSelectedCategory } from "../../redux/category/categorySlice";
import CustomModal from "../customModal/CustomModal";
import EditCategoryForm from "./EditCategoryForm";
import { setModalShow } from "../../redux/systemState/systemSlice";
import { fetchCategoriesAction } from "../../redux/category/categoryAction";
function CategoryTable() {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  const handleOnEdit = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(setModalShow(true));
  };
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);
  return (
    <>
      <CustomModal show={true} title="Update Category">
        <EditCategoryForm />
      </CustomModal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category, i) => {
            return (
              <tr key={category.slug}>
                <td>{i + 1}</td>
                <td>
                  <span className={category.status}>{category.status}</span>
                </td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleOnEdit(category)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default CategoryTable;
