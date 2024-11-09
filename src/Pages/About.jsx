import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { Box, Stack, Typography } from "@mui/material";
import { blogStore } from "../Store/blogStore";

import { infinity } from "ldrs";

infinity.register();

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
