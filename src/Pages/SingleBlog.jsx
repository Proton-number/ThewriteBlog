import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";

import { infinity } from "ldrs";

infinity.register();

function SingleBlog() {
  const { slug } = useParams();
  const { singlePost, fetchSingleBlog, customComponents } = blogStore();

  useEffect(() => {
    fetchSingleBlog(slug);
  }, [slug, fetchSingleBlog]);

  if (!singlePost) {
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
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f2ecff",
        justifyContent: "center",
        color: "black",
        padding: {
          xs: "80px 16px 30px", // More compact padding on mobile
          sm: "100px 30px 30px", // Original padding on larger screens
        },
        minHeight: "100vh",
      }}
    >
      <Stack spacing={4}>
        {" "}
        <Typography variant="h4" align="center">
          {singlePost?.title}
        </Typography>
        <Box
          component="img"
          sx={{
            width: { xs: "90%", lg: "1000px" }, // Increased from 900px
            height: { xs: "300px", sm: "400px", lg: "500px" }, // Increased from 450px
            margin: "0 auto",
            objectFit: "cover", // Add this to maintain aspect ratio
            borderRadius: "8px", // Add subtle rounding
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // Add subtle shadow
          }}
          src={singlePost?.mainImage?.asset?.url}
          alt={singlePost?.mainImage.alt}
          loading="lazy"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: { xs: "90%", sm: "80%", lg: "94%" },
          }}
        >
          {/* author name */}
          <Link
            to={"/about/" + singlePost.author._id}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography
              variant="subtitle2"
              sx={{ opacity: "90%", cursor: "pointer" }}
              component={motion.p}
              whileHover={{ y: -1 }}
            >
              {singlePost.name}
            </Typography>
          </Link>
          <Typography variant="subtitle2" sx={{ opacity: "90%" }}>
            {" "}
            {new Date(singlePost.publishedAt).toDateString()}{" "}
            {/*formatting the date */}
          </Typography>
        </Box>
        {/* block content to display the body from sanity */}
        <PortableText value={singlePost.body} components={customComponents} />
      </Stack>
    </Stack>
  );
}

export default SingleBlog;
