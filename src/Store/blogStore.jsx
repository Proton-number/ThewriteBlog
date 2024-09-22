import { create } from "zustand";
import sanityClient from "../client";

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
}));
