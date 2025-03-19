import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
