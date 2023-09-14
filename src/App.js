import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import Paymentoptions from "./pages/paymentoptions/Paymentoptions";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Review from "./pages/reviews/Review";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./privateroute/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Signup />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/paymentoptions"
          element={
            <PrivateRoute>
              <Paymentoptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<p>"Error 404"</p>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
