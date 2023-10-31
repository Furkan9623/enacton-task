import { Box, Typography, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/user-api";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  
  const forgotFormSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const result = await forgotPassword(email);
    console.log(result);
    const er = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("Otp send on your email id"), navigate(`/reset?email=${email}`))
      : alert(er);
  };

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
        onSubmit={forgotFormSubmit}
      >
        <Typography variant="h4">FORGOT PASSWORD</Typography>
        <TextField
          type="text"
          label="Enter email"
          size="small"
          inputRef={emailRef}
        />
        <Button variant="contained" color="success" size="small" type="submit">
          SUBMIT
        </Button>
      </form>
    </Box>
  );

};

export default ForgotPassword;
