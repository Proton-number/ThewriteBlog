import React from "react";
import { Box, Typography, Stack } from "@mui/material";

function Featured() {
  return (
    <Stack
      sx={{
        height: "100vh",
        backgroundColor: "#f2ecff",
        color: "black",
        padding: "30px",
      }}
    >
      <Typography variant="h2">Featured</Typography>
    </Stack>
  );
}

export default Featured;
