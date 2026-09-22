export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "navId",
      title: "Navigation ID",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          name: "navigationItem",
          type: "object",
          fields: [
            { name: "text", title: "Text", type: "string" },
            { name: "navigationItemUrl", title: "Navigation Item URL", type: "link" },
          ],
        },
      ],
    },
    {
      name: "headerCta",
      title: "Header CTA",
      type: "link",
    },
    {
      name: "flyoutAvailability",
      title: "Flyout Availability",
      type: "object",
      fields: [
        { name: "isAvailable", title: "Is Available", type: "boolean" },
        { name: "text", title: "Text", type: "text" },
      ],
    },
    {
      name: "flyoutCenterImage",
      title: "Flyout Center Image",
      type: "object",
      fields: [
        { name: "caption", title: "Caption", type: "string" },
        { name: "image", title: "Image", type: "image" },
        { name: "link", title: "Link", type: "link" },
      ],
    },
    {
      name: "flyoutContact",
      title: "Flyout Contact",
      type: "object",
      fields: [
        { name: "email", title: "Email", type: "string" },
      ],
    },
    {
      name: "flyoutFeaturedProject",
      title: "Flyout Featured Project",
      type: "object",
      fields: [
        { name: "caption", title: "Caption", type: "string" },
        {
          name: "project",
          title: "Project",
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },
    {
      name: "flyoutLocation",
      title: "Flyout Location",
      type: "string",
    },
    {
      name: "flyoutSocials",
      title: "Flyout Socials",
      type: "array",
      of: [
        {
          name: "socialLink",
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "handle", title: "Handle", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    },
    {
      name: "flyoutTeam",
      title: "Flyout Team",
      type: "array",
      of: [
        {
          name: "teamMember",
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "email", title: "Email", type: "string" },
          ],
        },
      ],
    },
  ],
};
