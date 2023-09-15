import React from "react";
import { Modal, Button } from "react-bootstrap";
function CustomModal({ children, show, handleClose, title }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default CustomModal;
