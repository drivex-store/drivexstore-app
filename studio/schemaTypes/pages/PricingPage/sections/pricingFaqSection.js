export default {
  name: "pricingFaqSection",
  title: "Pricing FAQ Section",
  type: "document",
  fields: [
    { name: "theme", title: "Theme", type: "string" },
    { name: "className", title: "Custom class name", type: "string" },
    {
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "headline", title: "Headline", type: "headline" },
        {
          name: "allowMultiple",
          title: "Allow multiple open at once",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "items",
          title: "FAQ items",
          type: "array",
          validation: (Rule) => Rule.min(1),
          of: [
            {
              type: "object",
              name: "pricingFaqItem",
              title: "FAQ item",
              fields: [
                { name: "headline", title: "Question", type: "string" },
                { name: "text", title: "Answer", type: "richText" },
              ],
              preview: { select: { title: "headline" } },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "content.headline.text" },
    prepare({ title }) {
      return { title: title || "Pricing FAQ Section" };
    },
  },
};
