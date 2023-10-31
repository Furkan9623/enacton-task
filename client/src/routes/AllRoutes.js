import Navbar from "../components/Navbar";
import ForgotPassword from "../pages/ResetPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
import { Routes, Route } from "react-router-dom";
import RegisterLoginForm from "../pages/RegisterLoginForm";
import Campaign from "../pages/Campaign";

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-login-user" element={<RegisterLoginForm />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/campaign" element={<Campaign />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
