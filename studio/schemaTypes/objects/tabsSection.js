export default {
  name: "tabsSection",
  title: "Tabs Section",
  type: "object",
  fields: [
    {
      name: "sectionHeadline",
      title: "Section Headline",
      type: "object",
      fields: [
        { name: "text", title: "Text", type: "string" },
        {
          name: "level",
          title: "Level",
          type: "string",
          options: {
            list: [
              { title: "H1", value: "h1" },
              { title: "H2", value: "h2" },
              { title: "H3", value: "h3" },
            ],
          },
          initialValue: "h1",
        },
      ],
    },
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
      name: "items",
      title: "Tab Items",
      type: "array",
      of: [
        {
          name: "tabItem",
          title: "Tab Item",
          type: "object",
          fields: [
            { name: "headline", title: "Headline", type: "string" },
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "Heading 2", value: "h2" },
                    { title: "Heading 3", value: "h3" },
                  ],
                  lists: [{ title: "Bullet", value: "bullet" }],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                    ],
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "headline",
            },
            prepare({ title }) {
              return {
                title: title || "Tab Item",
              };
            },
          },
        },
      ],
    },
  ],
};
