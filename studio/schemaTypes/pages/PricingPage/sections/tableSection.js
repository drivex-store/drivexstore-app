// File location: studio/schemaTypes/pages/PricingPage/sections/tableSection.js
export default {
  name: "tableSection",
  title: "Table Section",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "headline" },
    {
      name: "headlineDisplay",
      title: "Headline display style",
      description: "Optional override for how ScrollAnimatedHeadline renders this headline. Leave empty for the default.",
      type: "string",
    },
    { name: "text", title: "Bottom text", type: "richText" },
    { name: "button", title: "Button", type: "ctaButton" },
    {
      name: "tableTheme",
      title: "Table theme",
      description: "Theme applied to the whole table/list wrapper (data-theme).",
      type: "string",
      options: { list: ["light", "dark"] },
      initialValue: "dark",
    },
    {
      name: "highlightTheme",
      title: "Highlighted column theme",
      description: "Theme applied only to cells belonging to a column marked as highlighted below.",
      type: "string",
      options: { list: ["light", "dark"] },
    },
    {
      name: "columns",
      title: "Columns",
      type: "array",
      validation: (Rule) => Rule.min(1),
      of: [
        {
          type: "object",
          name: "tableColumn",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "highlight",
              title: "Highlight this column",
              description: "Adds a pulsing brand dot in the header and applies the highlighted column theme to its cells.",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: { title: "title", subtitle: "highlight" },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? "Highlighted" : undefined };
            },
          },
        },
      ],
    },
    {
      name: "rows",
      title: "Rows",
      type: "array",
      validation: (Rule) => Rule.min(1),
      of: [
        {
          type: "object",
          name: "tableRow",
          fields: [
            {
              name: "category",
              title: "Row label",
              description: "Small uppercase label shown in the first column. Optional.",
              type: "string",
            },
            {
              name: "values",
              title: "Values",
              description: "One value per column, in the same order as the columns defined above.",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: { title: "category", subtitle: "values.0" },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: "headline.text" },
    prepare({ title }) {
      return { title: title || "Table Section" };
    },
  },
};
