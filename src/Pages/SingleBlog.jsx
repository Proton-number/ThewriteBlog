import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";

function SingleBlog() {
  const { slug } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f2ecff",
        height: "100vh",
      }}
      >
    </Box>
  );
}

export default SingleBlog;
