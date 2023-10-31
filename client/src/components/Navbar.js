import { Box, Toolbar, AppBar, Avatar, Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginContext } from "../context/myContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { name, image } = JSON.parse(localStorage.getItem("NewUser")) || "";
  const { loginAuth, setLoginAuth } = useContext(loginContext);
  const loginUser = () => {
    navigate("/register-login-user");
  };
  const logoutUser = () => {
    localStorage.clear();
    setLoginAuth(false);
  };
  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Link to="/">HOME</Link>
          {loginAuth && <Link to="/campaign">ADD CAMPAIGN</Link>}
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {loginAuth && (
              <>
                <Link>{name}</Link>
                <Avatar src={image}>{name[0]}</Avatar>
              </>
            )}
            <Button
              size="small"
              variant="contained"
              color={loginAuth ? "error" : "secondary"}
              onClick={loginAuth ? logoutUser : loginUser}
            >
              {loginAuth ? "LOGOUT USER" : "REGISTER USER"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
