import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slice/userSlice";
import Account from "./pages/Account";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
