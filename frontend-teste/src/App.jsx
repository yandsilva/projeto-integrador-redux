import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slice/userSlice";
import Account from "./pages/Account";
import { getAllAddress } from "./store/slice/addressSlice";
import { getAllProduct } from "./store/slice/productSlice";
import AdminPage from "./pages/AdminPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Product from "./pages/Product";
import CartPage from "./pages/CartPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllAddress());
    dispatch(getAllProduct());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
