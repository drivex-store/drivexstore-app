// New document type — a small collection so any number of standalone
// content pages (Privacy Policy, Terms of Service, Cookie Policy...) can be
// added later without touching schema/code again, matching how `project`
// (work/[slug]) works.
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
        "Used for the browser tab title and the Studio document list — not rendered on the page itself. Put the visible \"Privacy Policy\" heading and \"Last updated: ...\" line as the first two blocks inside Content below, exactly like the reference site does.",
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
      name: "theme",
      title: "Theme",
      type: "string",
      options: { list: [{ title: "Light", value: "light" }, { title: "Dark", value: "dark" }] },
      initialValue: "light",
    },
    {
      name: "richText",
      title: "Content",
      type: "legalRichText",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}` : "No slug set" };
    },
  },
};
