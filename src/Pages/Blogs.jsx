import React, { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogPost, fetchBlogPosts } = blogStore();

  useEffect(() => {
    fetchBlogPosts(); // Fetch blog posts when component loads
  }, [fetchBlogPosts]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f2ecff",
      }}
    >
      <Box
        sx={{
          color: "black",
          padding: "30px",
          marginTop: "80px",
        }}
      >
        <Grid spacing={8} justifyContent="center" container>
          {blogPost &&
            blogPost.map((post, index) => (
              <Grid
                key={index}
                sx={{
                  // Center the first row, left align others
                  display: "flex",
                  justifyContent: index < 3 ? "center" : "flex-start",
                }}
              >
                <Link
                  to={"/singleBlog/" + post?.slug?.current}
                  style={{ color: "inherit", textDecoration: "none" }}
                  key={post?.slug?.current}
                >
                  <Stack spacing={2}>
                    <Box
                      component={motion.div}
                      sx={{
                        overflow: "hidden",
                        width: {
                          sm: "280px",
                          lg: "320px",
                        },
                        height: {
                          sm: "280px",
                          lg: "320px",
                        },
                        cursor: "pointer",
                      }}
                    >
                      {post?.mainImage && (
                        <Box
                          component={motion.img}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={post?.mainImage?.asset?.url}
                          alt={post?.mainImage?.alt}
                        />
                      )}
                    </Box>
                    <Stack>
                      <Typography variant="h6">{post?.title}</Typography>
                      <Typography variant="subtitle2">
                        {post?.description}
                      </Typography>
                      <Typography variant="subtitle2">
                        {post?.author?.name}
                      </Typography>
                    </Stack>
                  </Stack>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Blogs;
