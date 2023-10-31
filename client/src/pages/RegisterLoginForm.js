import { Box, Typography, TextField, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/user-api";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../context/myContext";

const RegisterLoginForm = () => {
  const [toggleDiv, setToggleDiv] = useState("register");
  const [file, setFile] = useState("");
  const initValue = {
    ...(toggleDiv === "register" && { name: "" }),
    email: "",
    password: "",
  };
  const [formInput, setFormInput] = useState(initValue);
  const toggleForm = (toggle) => {
    setToggleDiv(toggle);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormInput(initValue);
  }, [toggleDiv]);

  const formData = new FormData();
  formData.append("user", JSON.stringify(formInput));
  formData.append("userImage", file);
  const registerFormSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    console.log(result);
    const er = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("User register successfull"),
        setToggleDiv("login"),
        setFormInput(initValue))
      : alert(er);
  };
  const navigate = useNavigate();
  const { setLoginAuth } = useContext(loginContext);
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput);
    const result = await loginUser(formInput);
    console.log(result);
    const User = JSON.stringify(result?.data?.User);
    const er = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("User Login successfull"),
        navigate("/campaign"),
        localStorage.setItem("NewUser", User),
        setLoginAuth(true))
      : alert(er);
  };
  const { email, password } = formInput;
  return (
    <Box
      sx={{
        width: "25rem",
        boxShadow: "0 5px 4px grey",
        padding: "2.5rem",
        margin: "auto",
        marginTop: "8rem",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        onSubmit={
          toggleDiv === "register" ? registerFormSubmit : loginFormSubmit
        }
      >
        <Typography variant="h3">
          {toggleDiv === "register" ? "REGISTER USER" : "LOGIN USER"}
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            size="small"
            variant={toggleDiv === "login" ? "contained" : "outlined"}
            color="secondary"
            fullWidth
            onClick={() => toggleForm("login")}
          >
            LOGIN USER
          </Button>
          <Button
            size="small"
            variant={toggleDiv === "register" ? "contained" : "outlined"}
            color="secondary"
            fullWidth
            onClick={() => toggleForm("register")}
          >
            REGISTER USER
          </Button>
        </Box>
        {toggleDiv === "register" && (
          <TextField
            type="text"
            label="Enter name"
            size="small"
            name="name"
            onChange={handleChange}
          />
        )}
        <TextField
          type="text"
          label="Enter email"
          size="small"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          type="text"
          label="Enter password"
          size="small"
          name="password"
          value={password}
          onChange={handleChange}
        />
        {toggleDiv === "register" && (
          <TextField
            type="file"
            size="small"
            onChange={(e) => setFile(e.target.files[0])}
          />
        )}
        {toggleDiv === "login" && (
          <Button
            size="small"
            sx={{ width: "40%" }}
            onClick={() => navigate("/forgot")}
          >
            FORGOT PASSWORD
          </Button>
        )}
        <Button variant="contained" color="success" size="small" type="submit">
          {toggleDiv === "register" ? " REGISTER USER" : "LOGIN USER"}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterLoginForm;
