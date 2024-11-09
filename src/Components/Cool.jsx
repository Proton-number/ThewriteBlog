import { Box, Typography } from "@mui/material";
import React from "react";

function Cool() {
  return (
    <Box
      sx={{
        height: "40vh",
        backgroundColor: "black",
        zIndex: 0,
        position: "fixed",
      }}
    >
      <Typography variant="h1">Footer</Typography>
    </Box>
  );
}

export default Cool;
