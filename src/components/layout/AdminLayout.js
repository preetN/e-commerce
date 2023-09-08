import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";

function AdminLayout({ children, title }) {
  return (
    <div>
      <div className="admin-layout d-flex">
        <div className="left w-25 bg-dark text-light">
          <SideBar />
        </div>
        <div className="right w-75">
          <Header />
          <h1>{title}</h1>
          <hr />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
