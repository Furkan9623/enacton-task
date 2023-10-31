import Navbar from "../components/Navbar";
import PrivateRoutes from "./PrivateRoutes";

const { Routes, Route } = require("react-router-dom");
const { default: Home } = require("../pages/Home");
const { default: RegisterLoginForm } = require("../pages/RegisterLoginForm");
const { default: Campaign } = require("../pages/Campaign");

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-login-user" element={<RegisterLoginForm />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/campaign" element={<Campaign />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
