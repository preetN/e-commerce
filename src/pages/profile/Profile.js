import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useSelector } from "react-redux";

function Profile() {
  const { admin } = useSelector((state) => state.admin);
  return (
    <AdminLayout title="Profile">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div
          style={{
            height: "200px",
            width: "200px",
            borderRadius: "50%",
            backgroundColor: "grey",
          }}
        >
          Preet
        </div>
        <div>Sahil</div>
      </div>
    </AdminLayout>
  );
}

export default Profile;
