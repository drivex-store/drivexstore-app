import { asciiArtFields } from "../objects/asciiArtFields";

export default {
  name: "footer",
  title: "Footer",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "asciiLeft", title: "ASCII art (left)" },
    { name: "ascii", title: "ASCII art" },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    },
    {
      name: "navigation",
      title: "Navigation",
      type: "reference",
      to: [{ type: "navigation" }],
      group: "content",
    },
    {
      name: "leftText",
      title: "Left text",
      type: "richText",
      group: "content",
    },
    {
      name: "contactInformation",
      title: "Contact information",
      type: "richText",
      group: "content",
    },
    {
      name: "copyrightNotice",
      title: "Copyright notice",
      type: "richText",
      group: "content",
    },
    {
      name: "showWatermark",
      title: "Show watermark",
      type: "boolean",
      group: "content",
    },
    ...asciiArtFields("Left").map((f) => ({ ...f, group: "asciiLeft" })),
    ...asciiArtFields("").map((f) => ({ ...f, group: "ascii" })),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
};
