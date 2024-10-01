import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
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
        paddingTop: "50px",
      }}
    >
      <Box
        sx={{
          color: "black",
          padding: "30px",
          marginTop: "180px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <Grid container spacing={4}>
          {blogPost &&
            blogPost.map((post, index) => (
              <Grid key={index} xs={12} sm={6} md={4}>
                <Link
                  to={`/singleBlog/${post?.slug?.current}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  key={post?.slug?.current}
                >
                  <Card
                    component={motion.div}
                    // Adds hover effect for interaction
                    sx={{
                      maxWidth: 345, // Sets a max width for the card
                      height: "100%", // Makes all cards the same height
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box component={motion.div} whileHover={{ scale: 1.03 }}>
                      <CardMedia
                        component="img"
                        height="200" // Adjust image height
                        image={post?.mainImage?.asset?.url}
                        alt={post?.mainImage?.alt}
                        sx={{
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          fontWeight: 700,
                          fontSize: "18px",
                          lineHeight: "1.4em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2, // Limit title to 2 lines
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {post?.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          height: "60px", // Fixed height for description
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3, // Limit description to 3 lines
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {post?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Blogs;
