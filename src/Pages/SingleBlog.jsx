import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client";
import SanityBlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function SingleBlog() {
  const { slug } = useParams();
  const { singlePost, fetchSingleBlog, customSerializers } = blogStore();

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
          height: "100vh",
          color: "black",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f2ecff",
        height: "100vh",
        color: "black",
      }}
    >
      <Stack>
        {" "}
        <Typography variant="p">
          <b>{singlePost?.title}</b>
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "auto",
          }}
          src={singlePost.mainImage.asset.url}
          alt={singlePost.mainImage.alt}
          loading="lazy"
        />
        <SanityBlockContent
          blocks={singlePost.body}
          projectId="dtbj3t1s"
          dataset="production"
          serializers={customSerializers}
        />
      </Stack>
    </Box>
  );
}

export default SingleBlog;
