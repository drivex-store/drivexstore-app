export default {
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Used for the browser tab title and the Studio document list. The visible on-page heading comes from the Text Section's own \"title\" field below.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Controls the URL: good-fella.com/{slug}",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pageBuilder",
      title: "Sections",
      description: "Drag to reorder.",
      type: "array",
      of: [{ type: "pageBuilderSection" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}` : "No slug set" };
    },
  },
};
