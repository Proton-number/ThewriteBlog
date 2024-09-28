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
}));
