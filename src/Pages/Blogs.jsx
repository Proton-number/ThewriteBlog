import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { blogStore } from "../Store/blogStore";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { infinity } from "ldrs";

infinity.register();

function Blogs() {
  const { blogPost, fetchBlogPosts } = blogStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchBlogPosts(); // Fetch blog posts when component loads
  }, [fetchBlogPosts]);

  if (!blogPost) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f2ecff",
          color: "black",
          height: "100vh",
        }}
      >
        <l-infinity
          size="55"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="black"
        ></l-infinity>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f2ecff",
        paddingTop: "100px",
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
        <Grid container spacing={4} justifyContent="center">
          {blogPost &&
            blogPost.map((post, index) => (
              <Grid item key={index} xs={10} sm={6} md={4} lg={3}>
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
                      {!imageLoaded && (
                        <Skeleton
                          variant="rectangular"
                          width={345}
                          height={200}
                          animation="wave"
                          sx={{ backgroundColor: "#a6a6a6" }}
                        />
                      )}
                      <CardMedia
                        component="img"
                        image={post?.mainImage?.asset?.url}
                        alt={post?.mainImage?.alt}
                        onLoad={() => setImageLoaded(true)}
                        sx={{
                          aspectRatio: "16/10",
                          objectFit: "cover",
                          display: imageLoaded ? "block" : "none",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h5"
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
                        variant="subtitle2"
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
