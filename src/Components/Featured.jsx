import React, { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { blogStore } from "../Store/blogStore";
import Grid from '@mui/material/Grid2';
import { motion } from "framer-motion";

function Featured() {
  const { blogPost, fetchBlogPosts } = blogStore();

  useEffect(() => {
    fetchBlogPosts(); // Fetch blog posts when component loads
  }, [fetchBlogPosts]);
  return (
    <Stack
      sx={{
        height: "100vh",
        backgroundColor: "#f2ecff",
        color: "black",
        padding: "30px",
      }}
    >
      <Typography variant="h2">Featured</Typography>
      <Grid spacing={8} sx={{padding:"20px"}}  container>
        {blogPost && blogPost.map((post, index) => (
          <Grid  xs={12}
              sm={6}
              md={4}
              lg={2.4} item key={index}>
            <Stack spacing={2}>
              <Box
                component={motion.div}
                    sx={{
                      overflow: "hidden",
                        width: {
                        sm:"280px",
                        lg: "400px"
                        
                      },
                      height: {
                        sm:"280px",
                        lg: "400px"
                        
                      },
                      cursor:"pointer",
                    }}>
                {post.mainImage && (
                       <Box    component={motion.img}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt}/>
           )}
              </Box>
              <Stack>
                <Typography>{post.title}</Typography>
                <Typography variant='subtitle2'>{post.description}</Typography>
                 <Typography variant='subtitle2'>{post.author.name}</Typography>
              </Stack>
        </Stack>
  </Grid>
))}
      </Grid>
    </Stack>
  );
}

export default Featured;
