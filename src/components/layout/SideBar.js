import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const { admin } = useSelector((state) => state.admin);
  const sidelinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Categories",
      path: "/categories",
    },
    { label: "Products", path: "/product" },
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
  const { pathname } = useLocation();
  const getLinkCLasses = (path) => {
    let classes = "ms-2 p-2 side-link";
    if (pathname === path) {
      classes += "active-link";
    }
    return classes;
  };
  return (
    <div>
      <nav>
        <div className="mt-3 text-center">Admin account</div>
        <hr />
        <div>
          <ul className="list-unstyled">
            {sidelinks.map((link, path, i) => (
              <li className={getLinkCLasses(path)} key={i}>
                <Link className="nav-link" to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
            <hr />
            <li className={getLinkCLasses("/profile")}>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className={getLinkCLasses("/register")}>
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
