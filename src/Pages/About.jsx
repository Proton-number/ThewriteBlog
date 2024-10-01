import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client";
import { PortableText } from "@portabletext/react";
import { Box, Stack, Typography } from "@mui/material";
import { blogStore } from "../Store/blogStore";

function About() {
  const { author, fetchAuthor, customComponents } = blogStore();
  const { authorId } = useParams();

  console.log("The author:", author);

  useEffect(() => {
    fetchAuthor(authorId);
    console.log("The author id:");
  }, [authorId, fetchAuthor]);

  if (!author) {
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
    <Box
      sx={{
        backgroundColor: "#f2ecff",
        color: "black",
        paddingTop: "100px",
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingBottom: "30px",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontSize: { xs: "30px" } }}
        >
          {author?.name}
        </Typography>
        <PortableText value={author.bio} components={customComponents} />
      </Stack>
    </Box>
  );
}

export default About;
