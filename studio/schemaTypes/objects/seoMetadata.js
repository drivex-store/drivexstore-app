export default {
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
    },
  ],
};
