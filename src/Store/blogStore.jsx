import { create } from "zustand";
import sanityClient from "../client";

import { Box, Typography, Stack } from "@mui/material";

export const blogStore = create((set) => ({
  blogPost: null,

  //for the fetaured posts
  fetchFeaturedBlogPosts: async () => {
    try {
      const query = `*[_type == "post"] | order(_createdAt asc) [0...5]{
        title, description,  author ->{
        name,
        nickname
      }, slug, mainImage{asset->{_id, url}, alt}, body
      }`;

      const response = await sanityClient.fetch(query);
      if (!response || response.length === 0) {
        console.log("No blog posts found.");
      } else {
        console.log("Blog posts fetched:", response);
        set({ blogPost: response });
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  },

  //for the blog post page

  fetchBlogPosts: async () => {
    try {
      const query = `*[_type == "post"] | order(_createdAt asc) {
        title, description,  author ->{
        name,
        nickname
      }, slug, mainImage{asset->{_id, url}, alt}, body
      }`;

      const response = await sanityClient.fetch(query);
      if (!response || response.length === 0) {
        console.log("No blog posts found.");
      } else {
        set({ blogPost: response });
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  },

  //logic for single blogs
  singlePost: null,
  setSinglePost: (singlePost) => set({ singlePost }),
  fetchSingleBlog: async (slug) => {
    try {
      const query = `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            author ->{
                name,
                _id,
                nickname
              },
            mainImage{
                asset -> {
                    _id,
                    url
                }
            },
            body,
            "name": author-> name,
            "authorImage": author-> image
        }`;
      const data = await sanityClient.fetch(query, { slug });

      setTimeout(() => set({ singlePost: data[0] }), 1000);

      if (data[0]?.title) {
        document.title = data[0].title;
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  },

  // STYLING THE CONTENT IN BLOCK CONTENT
  customSerializers: () => ({
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
        <Typography
          variant="h2" // You can adjust the variant based on your design
          sx={{ textAlign: "justify", margin: "10px 0", color: "pink" }} // Add the style to justify the text
        >
          {children}
        </Typography>
      ),
    },
  }),
}));
