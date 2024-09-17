import { create } from "zustand";
import sanityClient from "../client";

export const blogStore = create((set) => ({
  blogPost: null,

  fetchBlogPosts: async () => {
    try {
      const query = `*[_type == "post"] | order(_createdAt asc) [0...5]{
        title, description, slug, mainImage{asset->{_id, url}, alt}, body
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
}));
