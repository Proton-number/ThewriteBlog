import { create } from "zustand";
import sanityClient from "../client";
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
        const imageUrl = builder.image(value.asset).width(400).url();
        return (
          <div className="flex justify-center my-8">
            <img
              src={imageUrl}
              alt={value.alt}
              className="w-[320px] sm:w-[450px] lg:w-[500px] lg:h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>
        );
      },
      quoteWithImage: ({ value }) => {
        const imageUrl = builder
          .image(value.image.asset)
          .width(1000)
          .height(1000)
          .url();
        return (
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 my-8 px-4">
            <blockquote className="italic text-left w-full md:w-1/3 text-gray-700 border-l-4 border-gray-300 pl-4">
              "{value.quote}"
            </blockquote>
            <img
              src={imageUrl}
              alt="Quote image"
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[550px] lg:h-[550px] rounded-lg shadow-lg object-cover"
            />
          </div>
        );
      },
    },
    block: {
      bullet: ({ children }) => (
        <li className="mb-2 text-gray-800 leading-relaxed ">{children}</li>
      ),
      normal: ({ children }) => (
        <div className="max-w-5xl mx-auto  mb-6">
          <p className="text-gray-800 leading-relaxed text-justify ">
            {children}
          </p>
        </div>
      ),
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-medium text-gray-900 mb-3 mt-4">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h3 className="text-1xl font-semibold text-gray-900 mb-3 mt-4">
          {children}
        </h3>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="pl-6 my-4 max-w-4xl mx-auto space-y-2 list-disc">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="pl-6 my-4 max-w-4xl mx-auto space-y-2 list-decimal">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="mb-2">
          <div className="text-gray-800 leading-relaxed">{children}</div>
        </li>
      ),
      number: ({ children }) => (
        <li className="mb-2">
          <div className="text-gray-800 leading-relaxed">{children}</div>
        </li>
      ),
    },
  },
}));
