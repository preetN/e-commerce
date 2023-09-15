import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { setSelectedCategory } from "../../redux/category/categorySlice";
import CustomModal from "../../components/customModal/CustomModal";

function CategoryTable() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { categoryLsit } = useSelector((state) => state.category);
  const handleOnEdit = (category) => {
    dispatch(setSelectedCategory(category));
  };
  return (
    <>
      <CustomModal
        show={true}
        handleClose={handleClose}
        title="Update Category"
      />
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
          {categoryLsit.map((category, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{category.status}</td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <Button onClick={() => handleOnEdit(category)}>Edit</Button>
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
