import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client";
import SanityBlockContent from "@sanity/block-content-to-react";
import { Box, Stack, Typography } from "@mui/material";
import { blogStore } from "../Store/blogStore";

const builder = imageUrlBuilder(sanityClient);

function About() {
  const { author, fetchAuthor } = blogStore();
  const { authorId } = useParams();

  console.log("The author:", author);

  useEffect(() => {
    fetchAuthor(authorId);
    console.log("The author id:");
  }, [authorId, fetchAuthor]);

  // STYLING THE CONTENT IN BLOCK CONTENT
  const customSerializers = {
    types: {
      image: ({ node }) => {
        const imageUrl = builder.image(node.asset).width(400).url(); // Adjust width as needed
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
              alt={node.alt}
              sx={{
                width: { xs: "320px", sm: "450px", lg: "900px" },
                height: "auto",
              }}
            />
          </Box>
        );
      },
      block: ({ children }) => (
        <Box sx={{ margin: "auto" }}>
          <Typography
            variant="h6"
            sx={{ textAlign: "justify", fontSize: { xs: "18px", lg: "24px" } }}
          >
            {children}
          </Typography>
        </Box>
      ),
    },
  };

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
        <SanityBlockContent
          blocks={author.bio}
          projectId="dtbj3t1s"
          dataset="production"
          serializers={customSerializers}
        />
      </Stack>
    </Box>
  );
}

export default About;
