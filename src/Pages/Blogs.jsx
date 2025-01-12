import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Grid2,
} from "@mui/material";
import { blogStore } from "../Store/blogStore";
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
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 p-6 ">
        {blogPost &&
          blogPost.map((post, index) => (
            <Box key={index}>
              <Link
                to={`/singleBlog/${post?.slug?.current}`}
                style={{ color: "inherit", textDecoration: "none" }}
                key={post?.slug?.current}
              >
                <Card
                  component={motion.div}
                  sx={{
                    maxWidth: 345,
                    height: "100%",
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
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post?.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        height: "60px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default Blogs;
