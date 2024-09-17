import React, { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";

function Featured() {
  const { blogPost, fetchBlogPosts } = blogStore();

  useEffect(() => {
    fetchBlogPosts(); // Fetch blog posts when component loads
  }, [fetchBlogPosts]);
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
