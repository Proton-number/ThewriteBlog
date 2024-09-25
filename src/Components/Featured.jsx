import React, { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { loginStore } from "../Store/loginStore";

function Featured() {
  const { blogPost, fetchFeaturedBlogPosts } = blogStore();
  const { user } = loginStore();

  useEffect(() => {
    fetchFeaturedBlogPosts(); // Fetch blog posts when component loads
  }, [fetchFeaturedBlogPosts]);

  return (
    <Stack
      component={motion.div}
      initial={{
        background: "radial-gradient(circle at center, black 0%, #f2ecff 0%)", // Starts with a black circle in the center
        color: "black",
      }}
      whileInView={{
        background: [
          "radial-gradient(circle at center, black 0%, #f2ecff 0%)", // Initial state
          "radial-gradient(circle at center, black 100%, #f2ecff 0%)", // End state, expands outward
        ],
        transition: { delay: 0.2, duration: 0.5 }, // Smooth timing for the effect
        color: "#f2ecff",
      }}
      viewport={{ once: false, amount: 0.22 }}
      sx={{
        padding: "30px",
      }}
    >
      <Typography variant="h2">Featured</Typography>
      <Grid
        spacing={8}
        sx={{ padding: "20px" }}
        justifyContent="center"
        container
      >
        {blogPost &&
          blogPost.map((post, index) => (
            <Grid xs={12} sm={6} md={4} lg={2.4} key={index}>
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
                        lg: "300px",
                      },
                      height: {
                        sm: "280px",
                        lg: "300px",
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
    </Stack>
  );
}

export default Featured;
