export default {
  name: "tabsSectionField",
  title: "Tabs Section Field",
  type: "object",
  fields: [
    {
      name: "sectionContent",
      title: "Section Content",
      type: "tabsSection",
    },
  ],
  preview: {
    select: {
      title: "sectionContent.sectionHeadline.text",
      subtitle: "sectionContent.theme",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Tabs Section",
        subtitle: subtitle ? `Theme: ${subtitle}` : "No theme set",
      };
    },
  },
};
