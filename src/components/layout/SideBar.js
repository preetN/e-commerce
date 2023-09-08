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
    {
      label: "Profile",
      path: "/profile",
    },
  ];
  return (
    <div>
      <nav>
        <div>Admin account</div>
        <hr />
        <div>
          <ul>
            {sidelinks.map((link) => (
              <li>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
