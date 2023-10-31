import { Box, Typography, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/user-api";
import axios from "axios";
const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const passwordRef = useRef(null);
  const otpRef = useRef(null);
  const navigate = useNavigate();
  const resetFormSubmit = async (e) => {
    e.preventDefault();
    const newPassword = passwordRef.current.value;
    const Otp = otpRef.current.value;
    const result = await resetPassword({ newPassword, email, Otp });
    console.log(result);
    const er = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("new password set"), navigate("/register-login-user"))
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
        onSubmit={resetFormSubmit}
      >
        <Typography variant="h4">SET NEW PASSWORD</Typography>
        <TextField
          type="text"
          label="Enter Otp"
          size="small"
          inputRef={otpRef}
        />
        <TextField
          type="text"
          label="Enter new password"
          size="small"
          inputRef={passwordRef}
        />

        <Button variant="contained" color="success" size="small" type="submit">
          SUBMIT
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
