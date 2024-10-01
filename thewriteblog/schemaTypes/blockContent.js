import { defineType, defineArrayMember } from 'sanity';

/**
 * Block Content Schema for rich text fields.
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // Image block type
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
    // Custom block for Quote and Image side by side
    defineArrayMember({
      title: 'Quote with Image',
      name: 'quoteWithImage',
      type: 'object',
      fields: [
        {
          title: 'Quote',
          name: 'quote',
          type: 'text', // or 'blockContent' if you want rich text inside the quote
        },
        {
          title: 'Image',
          name: 'image',
          type: 'image',
          options: { hotspot: true },
        },
      ],
      preview: {
        select: {
          title: 'quote',
          media: 'image',
        },
        prepare(selection) {
          const { title, media } = selection;
          return {
            title: `Quote: ${title ? title.substring(0, 30) : 'No Quote'}`,
            media,
          };
        },
      },
    }),
  ],
});
