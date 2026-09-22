export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "uri",
      title: "URI",
      type: "slug",
      description: "URL path for the page (e.g. /privacy-policy)",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            ? `/${input
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")}`
            : "",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "seoMetadata",
      title: "SEO Metadata",
      type: "seoMetadata",
    },
    {
      name: "pageBuilder",
      title: "Page Builder",
      type: "object",
      fields: [
        {
          name: "sectionsArray",
          title: "Sections",
          type: "array",
          of: [
            { type: "textSectionField" },
            { type: "tabsSectionField" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      uri: "uri.current",
    },
    prepare({ title, uri }) {
      return {
        title,
        subtitle: uri || "No URI set",
      };
    },
  },
};
