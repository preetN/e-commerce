import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/category/categorySlice";
import { fetchPaymentOptionsAction } from "../../redux/paymentOptions/paymentOptionAction";
import { setModalShow } from "../../redux/systemState/systemSlice";
import CustomModal from "../customModal/CustomModal";
import EditPaymentOptForm from "./EditPaymentOptForm";
import { setSelectedPaymentOption } from "../../redux/paymentOptions/paymentOptionsSlice";

function PaymentOptTable() {
  const dispatch = useDispatch();
  const { paymentList } = useSelector((state) => state.paymentOption);

  const handleOnEdit = (paymentOption) => {
    dispatch(setSelectedPaymentOption(paymentOption));
    dispatch(setModalShow(true));
  };

  useEffect(() => {
    dispatch(fetchPaymentOptionsAction());
  }, []);

  return (
    <div>
      <CustomModal title="Update Payment Option">
        <EditPaymentOptForm />
      </CustomModal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentList.map((cat, i) => {
            return (
              <tr key={cat.slug}>
                <td>{i + 1}</td>
                <td>
                  <span className={cat.status}>{cat.status}</span>
                </td>
                <td>{cat.name}</td>
                <td>
                  <img src={cat.url} width={"150px"}></img>
                </td>
                <td>
                  <Button variant="warning" onClick={() => handleOnEdit(cat)}>
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default PaymentOptTable;
