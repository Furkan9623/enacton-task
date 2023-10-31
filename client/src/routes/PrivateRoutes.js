const { useContext } = require("react");
const { loginContext } = require("../context/myContext");
const { Outlet, Navigate } = require("react-router-dom");

const PrivateRoutes = () => {
  const { loginAuth } = useContext(loginContext);
  return loginAuth ? <Outlet /> : <Navigate to="/register-login-user" />;
};

export default PrivateRoutes;
