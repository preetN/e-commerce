import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  const sidelinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Categories",
      path: "/categories",
    },
    {
      label: "Payment Option",
      path: "/paymentoptions",
    },
    {
      label: "Orders",
      path: "/orders",
    },
    {
      label: "Customers",
      path: "/customers",
    },
    {
      label: "Reviews",
      path: "/reviews",
    },
  ];
  return (
    <div>
      <nav>
        <div className="mt-3 text-center">Admin account</div>
        <hr />
        <div>
          <ul className="list-unstyled">
            {sidelinks.map((link, i) => (
              <li className="p-2 text-center" key={i}>
                <Link className="nav-link" to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
            <hr />
            <li className="p-2 text-center">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="p-2 text-center">
              <Link className="nav-link" to="/register">
                Admin Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
