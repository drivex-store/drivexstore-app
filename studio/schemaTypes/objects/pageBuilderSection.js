// Matches the API payload contract exactly:
// { _type: "pageBuilderSection", sectionType: "textSection", theme, selector,
//   className, content: { title, lastUpdated, sections: [{heading, body, list, additional}] } }
export default {
  name: "pageBuilderSection",
  title: "Page Builder Section",
  type: "object",
  fields: [
    {
      name: "sectionType",
      title: "Section type",
      type: "string",
      options: { list: [{ title: "Text Section", value: "textSection" }] },
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
      name: "selector",
      title: "Selector",
      type: "string",
      options: { list: [{ title: "Narrow", value: "text-narrow" }] },
      initialValue: "text-narrow",
    },
    { name: "className", title: "Custom class name", type: "string" },
    {
      name: "content",
      title: "Content",
      type: "object",
      hidden: ({ parent }) => parent?.sectionType !== "textSection",
      fields: [
        { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
        { name: "lastUpdated", title: "Last updated label", type: "string" },
        {
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            {
              type: "object",
              name: "textSectionItem",
              title: "Section",
              fields: [
                { name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() },
                { name: "body", title: "Body", type: "text" },
                { name: "list", title: "Bullet list", type: "array", of: [{ type: "string" }] },
                {
                  name: "additional",
                  title: "Additional paragraphs",
                  description: "Always an array, even for a single extra paragraph.",
                  type: "array",
                  of: [{ type: "text" }],
                },
              ],
              preview: { select: { title: "heading" } },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { sectionType: "sectionType", title: "content.title" },
    prepare({ sectionType, title }) {
      return { title: title || sectionType || "Untitled section" };
    },
  },
};
