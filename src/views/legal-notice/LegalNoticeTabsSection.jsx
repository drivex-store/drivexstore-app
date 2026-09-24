import { TabsClient } from "@views/components/TabsClient";

const PADDING_TOP = {
  sm: "pt-32",
  md: "pt-48",
  lg: "pt-64 lg:pt-128",
  xl: "pt-80 lg:pt-160",
  "2xl": "pt-96 lg:pt-192",
};

const PADDING_BOTTOM = {
  sm: "pb-32",
  md: "pb-48",
  lg: "pb-64 lg:pb-128",
  xl: "pb-80 lg:pb-160",
  "2xl": "pb-96 lg:pb-192",
};

export function LegalNoticeTabsSection({
  theme,
  sectionHeadline,
  paddingTop,
  paddingBottom,
  items,
}) {
  if (!items?.length) return null;

  return (
    <section
      data-theme={theme || "light"}
      data-page-builder-section="tabsSection"
      className={[
        "bg-background",
        PADDING_TOP[paddingTop] || "pt-64 lg:pt-128",
        PADDING_BOTTOM[paddingBottom] || "pb-64 lg:pb-128",
      ].join(" ")}
    >
      <div className="grid-container flex items-center lg:min-h-svh">
        <TabsClient items={items} sectionHeadline={sectionHeadline} />
      </div>
    </section>
  );
}
