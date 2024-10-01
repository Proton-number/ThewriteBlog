import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";

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
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Stack
      sx={{
        backgroundColor: "#f2ecff",
        color: "black",
        paddingTop: "100px",
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingBottom: "30px",
        alignItems: "center",
      }}
    >
      <Stack spacing={4} alignItems="center">
        {" "}
        <Typography variant="h3" align="center">
          {singlePost?.title}
        </Typography>
        <Box
          component="img"
          sx={{
            width: { xs: "90%", lg: "900px" },
            height: { xs: "300px", sm: "400px", lg: "450px" },
            margin: "0 auto",
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
            width: { xs: "90%", sm: "80%" },
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
