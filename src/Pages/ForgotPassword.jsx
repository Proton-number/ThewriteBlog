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
import { motion } from "framer-motion";
import LoadingButton from "@mui/lab/LoadingButton";

function ForgotPassword() {
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
        elevation={4}
        sx={{
          padding: { xs: "24px", sm: "30px", lg: "40px" },
          borderRadius: "30px",
        }}
      >
        <Stack spacing={3}>
          <Typography>Forgot Password?</Typography>
          <TextField label={"Email..."} type="email" />
          <LoadingButton variant="contained">Reset</LoadingButton>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
