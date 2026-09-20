export default {
  name: "servicesListSection",
  title: "Services List Section",
  type: "document",
  fields: [
    { name: "theme", title: "Theme", type: "string" },
    {
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "headline", title: "Headline", type: "headline" },
        {
          name: "label",
          title: "Label",
          description: 'Small eyebrow label, e.g. "// Services"',
          type: "string",
        },
        { name: "media", title: "Image", type: "media" },
        {
          name: "items",
          title: "Service items",
          description: 'Each item renders as one line in the list, e.g. "Custom frontend build, end to end"',
          type: "array",
          of: [
            {
              type: "object",
              name: "serviceItem",
              fields: [{ name: "text", title: "Text", type: "string" }],
              preview: { select: { title: "text" } },
            },
          ],
        },
        {
          name: "animated",
          title: "Animated",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "pushEffect",
          title: "Push Effect",
          type: "boolean",
          initialValue: true,
        }
      ],
    },
  ],
  preview: {
    select: { title: "content.headline.text" },
    prepare({ title }) {
      return { title: title || "Services List Section" };
    },
  },
};
