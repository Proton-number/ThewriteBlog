import { create } from "zustand";
import sanityClient from "../client";
import { Box, Typography } from "@mui/material";
import imageUrlBuilder from "@sanity/image-url";

// Initialize builder
const builder = imageUrlBuilder(sanityClient);

// Define urlFor function
const urlFor = (source) => builder.image(source);

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
  fetchSingleBlog: async (slug) => {
    try {
      const query = `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            author ->{
                name,
                _id,
                nickname,
                slug,
              },
            mainImage{
                asset -> {
                    _id,
                    url
                }
            },
            body,
            "name": author-> name,
            "authorImage": author-> image,
              publishedAt,
        }`;
      const data = await sanityClient.fetch(query, { slug });

      set({ singlePost: data[0] });
      if (data[0]?.title) {
        document.title = data[0].title;
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  },

  // for author
  author: null,
  fetchAuthor: async (authorId) => {
    try {
      const query = `*[_type == "author"  && _id == "${authorId}"]{
      name,
      nickname,
      bio,
      "authorImage": image.asset->url
    }`;

      const data = await sanityClient.fetch(query);

      set({ author: data[0] });
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  },

  //custom componponents for block
  customComponents: {
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
                width: { xs: "320px", sm: "450px", lg: "500px" },
                height: { lg: "400px" },
              }}
            />
          </Box>
        );
      },
      quoteWithImage: ({ value }) => {
        const imageUrl = builder
          .image(value.image.asset)
          .width(1000)
          .height(1000)
          .url();
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "20px",
              margin: "20px 0",
            }}
          >
            <Typography
              component="blockquote"
              variant="body1"
              sx={{
                fontStyle: "italic",
                textAlign: "left",
                width: "30%",
              }}
            >
              "{value.quote}"
            </Typography>
            <Box
              component="img"
              src={imageUrl}
              alt="Quote image"
              sx={{
                width: { xs: "150px", sm: "200px", lg: "550px" },
                height: { xs: "150px", sm: "200px", lg: "550px" },
                borderRadius: "8px",
              }}
            />
          </Box>
        );
      },
    },
    block: {
      bullet: ({ children }) => (
        <Box component="li" sx={{ marginBottom: "8px", width: "80%" }}>
          {children}
        </Box>
      ),
      normal: ({ children }) => (
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Typography variant="h6" sx={{ textAlign: "justify" }}>
            {children}
          </Typography>
        </Box>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <Box
          component="ul"
          sx={{ paddingLeft: "1.5rem", margin: "1rem 0", width: "60%" }}
        >
          {children}
        </Box>
      ),
      number: ({ children }) => (
        <Box
          component="ol"
          sx={{ paddingLeft: "1.5rem", margin: "1rem 0", width: "80%" }}
        >
          {children}
        </Box>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <Box component="li" sx={{ marginBottom: "0.5rem" }}>
          <Typography variant="body1">{children}</Typography>
        </Box>
      ),
      number: ({ children }) => (
        <Box component="li" sx={{ marginBottom: "0.5rem" }}>
          <Typography variant="body1">{children}</Typography>
        </Box>
      ),
    },
  },
}));
