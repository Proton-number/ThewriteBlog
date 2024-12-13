import React, { useState, useEffect } from "react";
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
import { AnimatePresence, motion } from "framer-motion";

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

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validateEmail = (email) => {
    setEmail(email);
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePassword = (password) => {
    setPassword(password);
    setIsPasswordValid(passwordRegex.test(password));
  };
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 500) {
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Stack
      sx={{
        height: isKeyboardVisible ? "auto" : "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2ecff",
        color: "black",
        paddingTop: { xs: "70px", sm: "30px" },
      }}
    >
      <AnimatePresence>
        {error && (
          <Box
            component={motion.div}
            key="error-alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1.2 }}
          >
            <Alert
              variant="filled"
              severity="error"
              sx={{ marginBottom: "20px" }}
            >
              {[
                "Firebase: Error (auth/invalid-credential).",
                "Firebase: Error (auth/invalid-email).",
                "Firebase: Error (auth/missing-password).",
              ].includes(error)
                ? "Invalid Email or Password"
                : null}
            </Alert>
          </Box>
        )}
      </AnimatePresence>

      {/* Show error message if password is invalid */}
      <AnimatePresence>
        {!isPasswordValid && (
          <Box
            component={motion.div}
            key="error-alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1.2 }}
            sx={{ width: { xs: "290px", sm: "340px" } }}
          >
            <Alert
              variant="filled"
              severity="error"
              sx={{ marginBottom: { xs: "20px", lg: "10px" } }}
            >
              Password should contain:
              <br /> Lowercase, Uppercase, Digit, Special char, Min 8 chars
            </Alert>
          </Box>
        )}
      </AnimatePresence>
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
                  <EmailIcon sx={{ color: isEmailValid ? "grey" : "red" }} />
                </InputAdornment>
              ),
              inputProps: {
                style: {
                  color: "black",
                },
              },
            }}
            error={!isEmailValid}
            placeholder={"Enter your email..."}
            type="email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            helperText={
              !isEmailValid && (
                <Typography sx={{ color: "#cc0000" }} variant="subtitle3">
                  Please enter a valid email address
                </Typography>
              )
            }
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
                      <VisibilityOff
                        sx={{ color: isPasswordValid ? "grey" : "red" }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setLoginShowPassword(true);
                      }}
                    >
                      <Visibility
                        sx={{ color: isPasswordValid ? "grey" : "red" }}
                      />
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
            placeholder={" Enter your password..."}
            type={loginShowPassword ? "password" : "text"}
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            error={!isPasswordValid}
            helperText={
              <Stack spacing={1}>
                {/* Show password requirements initially */}
                <Typography variant="subtitle3">
                  Please enter a valid password.
                </Typography>
              </Stack>
            }
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
              Log In
            </Button>
          ) : (
            <Button
              onClick={() => {
                signUpWithEmailAndPassword(email, password, navigate);
              }}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Sign Up
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
    </Stack>
  );
}

export default Login;
