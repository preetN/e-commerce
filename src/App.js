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
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/paymentoptions" element={<Paymentoptions />} />
        <Route path="/profile" element={<Profile.js />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/*" element={<p>"Error 404"</p>} />
      </Routes>
    </div>
  );
}

export default App;
