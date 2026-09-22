export default {
  name: "linkField",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
          { title: "Email", value: "email" },
          { title: "Download", value: "download" },
          { title: "Modal", value: "modal" },
        ],
      },
    },
    { name: "text", title: "Text", type: "string" },
    { name: "href", title: "URL", type: "string" },
    { name: "email", title: "Email", type: "string" },
    {
      name: "internal",
      title: "Internal page",
      type: "object",
      description: "Pick a page here when Type is \"Internal\" -- the live URL is resolved from it automatically, so it stays correct if the page's slug ever changes.",
      hidden: ({ parent }) => parent?.type !== "internal",
      fields: [
        {
          name: "link",
          title: "Page",
          type: "reference",
          to: [
            { type: "homePage" },
            { type: "aboutPage" },
            { type: "pricingPage" },
            { type: "contactPage" },
            { type: "workPage" },
            { type: "project" },
            { type: "page" },
          ],
        },
      ],
    },
    { name: "openInNewTab", title: "Open in new tab", type: "boolean" },
    { name: "canDownload", title: "Can download", type: "boolean" },
    { name: "modalId", title: "Modal ID", type: "string" },
  ],
};
