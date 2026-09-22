export default {
  name: "textSectionField",
  title: "Text Section",
  type: "object",
  fields: [
    {
      name: "sectionSettings",
      title: "Section Settings",
      type: "object",
      fields: [
        {
          name: "sectionTitle",
          title: "Section Title",
          type: "string",
        },
        {
          name: "customSelector",
          title: "Custom Selector",
          type: "string",
        },
      ],
    },
    {
      name: "sectionContent",
      title: "Section Content",
      type: "object",
      fields: [
        {
          name: "theme",
          title: "Theme",
          type: "string",
          options: {
            list: [
              { title: "Light", value: "light" },
              { title: "Dark", value: "dark" },
            ],
          },
          initialValue: "light",
        },
        {
          name: "paddingTop",
          title: "Padding Top",
          type: "string",
          options: {
            list: ["sm", "md", "lg", "xl", "2xl"],
          },
        },
        {
          name: "paddingBottom",
          title: "Padding Bottom",
          type: "string",
          options: {
            list: ["sm", "md", "lg", "xl", "2xl"],
          },
        },
        {
          name: "appRichText",
          title: "Rich Text",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "Heading 2", value: "h2" },
                { title: "Heading 3", value: "h3" },
              ],
              lists: [
                { title: "Bullet", value: "bullet" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    title: "Link",
                    fields: [
                      {
                        name: "href",
                        type: "url",
                        title: "URL",
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "sectionSettings.sectionTitle",
      subtitle: "sectionSettings.customSelector",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Text Section",
        subtitle: subtitle ? `Selector: ${subtitle}` : "No selector",
      };
    },
  },
};
