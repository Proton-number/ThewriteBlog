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
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    loginShowPassword,
    setLoginShowPassword,
    haveAccount,
    setHaveAccount,
    signInWithGoogle,
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    email,
    password,
    setEmail,
    setPassword,
    error,
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
      <Paper
        elevation={6}
        sx={{
          padding: { xs: "24px", sm: "30px", lg: "60px" },
          textAlign: "center",
          borderRadius: "20px",
        }}
      >
        <Stack spacing={3}>
          {haveAccount ? (
            <Typography>Login</Typography>
          ) : (
            <Typography>SignUp</Typography>
          )}

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {haveAccount && (
            <Link
              to="/ForgotPassword"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  cursor: "pointer",
                  opacity: "80%",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Typography>
            </Link>
          )}

          {haveAccount ? (
            <Button
              onClick={() => {
                logInWithEmailAndPassword(email, password, navigate);
              }}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={() => {
                signUpWithEmailAndPassword(email, password, navigate);
              }}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              SignIn
            </Button>
          )}

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
            onClick={() => signInWithGoogle(navigate)}
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
            <Typography> Sign In with Google</Typography>
          </Stack>

          {haveAccount ? (
            <Typography>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setHaveAccount(false);
                }}
                style={{ color: "grey", cursor: "pointer" }}
              >
                Sign up here
              </span>{" "}
            </Typography>
          ) : (
            <Typography>
              {" "}
              Have an account?{" "}
              <span
                onClick={() => {
                  setHaveAccount(true);
                }}
                style={{ color: "grey", cursor: "pointer" }}
              >
                Log in here
              </span>{" "}
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
