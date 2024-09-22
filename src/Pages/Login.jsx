import React from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  TextField,
  Paper,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginStore } from "../Store/loginStore";

function Login() {
  const {
    loginShowPassword,
    setLoginShowPassword,
    signinShowPassword,
    setSigninShowPassword,
  } = loginStore();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2ecff",
        color: "black",
      }}
    >
      <Paper elevation={6} sx={{ padding: { xs: "24px", sm: "30px", lg: "60px" } }}>
        <Stack spacing={3}>
          <Typography>Login</Typography>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
              inputProps: {
                style: {
                  color: "black",
                },
              },
            }}
            label={"Email..."}
            type="email"
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {loginShowPassword ? (
                    <IconButton
                      onClick={() => {
                        setLoginShowPassword(false);
                      }}
                    >
                      <VisibilityOff />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setLoginShowPassword(true);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
              inputProps: {
                style: {
                  color: "black",
                },
              },
            }}
            label={"Password..."}
            type={loginShowPassword ? "password" : "text"}
          />
          <Typography>Forgot Password?</Typography>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Login
          </Button>

          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Divider sx={{ width: "40%" }} />
            <Typography sx={{ opacity: "60%" }}>or</Typography>
            <Divider sx={{ width: "40%" }} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            spacing={2}
          >
            <Box
              component="img"
              src="/Google.svg"
              alt="google-logo"
              sx={{ width: "25px" }}
            />
            <Typography> Sign Up with Google</Typography>
          </Stack>
          <Typography>
            Don't have an account? <span>Sign up here</span>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
