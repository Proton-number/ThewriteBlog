import React from "react";
import {
  Typography,
  Stack,
  Box,
  TextField,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import LoadingButton from "@mui/lab/LoadingButton";
import { loginStore } from "../Store/loginStore";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { alert, sending, resetEmail, setResetEmail, resetHandler, error } =
    loginStore();
  const navigate = useNavigate();
  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2ecff",
        color: "black",
      }}
    >
      <AnimatePresence>
        {alert && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert variant="filled" severity="success">
              Check your Email for a reset link
            </Alert>
          </Box>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && !alert && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </Box>
        )}
      </AnimatePresence>

      <Paper
        elevation={4}
        sx={{
          padding: { xs: "24px", sm: "30px", lg: "40px" },
          borderRadius: "30px",
        }}
      >
        <Stack spacing={3}>
          <Typography>Reset your Password</Typography>
          <TextField
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            label={"Email..."}
            type="email"
          />
          <LoadingButton
            loading={sending}
            variant="contained"
            onClick={() => {
              resetHandler(navigate);
            }}
          >
            Reset
          </LoadingButton>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default ForgotPassword;
