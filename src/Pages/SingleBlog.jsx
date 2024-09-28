import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(sanityClient);

function SingleBlog() {
  const { slug } = useParams();
  const { singlePost, fetchSingleBlog } = blogStore();

  useEffect(() => {
    fetchSingleBlog(slug);
  }, [slug, fetchSingleBlog]);

  // STYLING THE CONTENT IN BLOCK CONTENT
  const customComponents = {
    types: {
      image: ({ value }) => {
        const imageUrl = builder.image(value.asset).width(400).url(); // Adjust width as needed
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={value.alt}
              sx={{
                width: { xs: "320px", sm: "450px", lg: "900px" },
                height: "auto",
              }}
            />
          </Box>
        );
      },
    },
    block: {
      normal: ({ children }) => (
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Typography
            variant="h6"
            sx={{ textAlign: "justify" }} // Add the style to justify the text
          >
            {children}
          </Typography>
        </Box>
      ),
    },
  };

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
            width: { xs: "90%", lg: "80%" },
            height: { xs: "300px", lg: "750px" },
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
