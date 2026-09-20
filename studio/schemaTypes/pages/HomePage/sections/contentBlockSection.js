export default {
  name: "contentBlockSection",
  title: "Content Block Section",
  type: "document",
  fields: [
    { name: "theme", title: "Theme", type: "string" },
    { name: "selector", title: "Selector (optional anchor id)", type: "string" },
    { name: "className", title: "Custom class name", type: "string" },
    { name: "layout", title: "Layout", type: "string", options: { list: ["mediaLeft", "mediaRight", "textOnly"] } },
    {
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "headline", title: "Headline (media column)", type: "headline" },
        { name: "headlineDisplay", title: "Headline display", type: "string" },
        { name: "secondaryHeadline", title: "Headline (text column)", type: "headline" },
        { name: "media", title: "Media", type: "media" },
        {
          name: "mediaSize",
          title: "Media size",
          description:
            "Compact: narrow column (span-3), cropped to 16:9, divider shown above body text. " +
            "Wide: wider column (span-4), natural aspect ratio (no crop), divider shown above body text. " +
            "Large: half-width column (span-6), cropped to 16:9, no divider -- for the \"Start a project\" style contact CTA.",
          type: "string",
          options: { list: ["compact", "wide", "large"] },
          initialValue: "compact",
        },
        { name: "text", title: "Rich text", type: "richText" },
        {
          name: "ctas",
          title: "CTAs",
          type: "object",
          fields: [
            { name: "primary", title: "Primary button", type: "ctaButton" },
            { name: "secondary", title: "Secondary button", type: "ctaButton" },
          ],
        },
        { name: "footnote", title: "Footnote", type: "string" },
      ],
    },
  ],
  preview: {
    select: { title: "content.headline.text" },
    prepare({ title }) {
      return { title: title || "Content Block Section" };
    },
  },
};
