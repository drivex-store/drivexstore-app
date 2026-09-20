import { ScrollAnimatedHeadline } from "@animations/components/ScrollAnimatedHeadline";
import { List } from "@animations/components/List";
import { SanityMedia } from "@libs/sanity/components/SanityMedia";
import { getServicesListSectionData } from "@libs/sanity/queries/PricingPage/ServicesListSectionData";

export default async function ServicesListSection() {
  const data = await getServicesListSectionData();
  if (!data?.items?.length) return null;
  const { theme, headline, label, media, items } = data;

  return (
    <section
      data-theme={theme || "light"}
      data-page-builder-section={true}
      className="pt-64 lg:pt-128 pb-64 lg:pb-128 bg-background"
    >
      <div className="grid-container">
        <div className="grid-layout gap-y-48">
          <div className="grid-span-12 lg:grid-span-4 lg:grid-start-2 ">
            <div className="flex h-full flex-col justify-between items-start gap-80">
              <div className="flex w-full flex-row flex-wrap items-end justify-between gap-16 ">
                {headline?.text && (
                  <div>
                    <ScrollAnimatedHeadline
                      headline={{ level: headline.level || "h3", text: headline.text }}
                    />
                  </div>
                )}
                {label && <p className="section-label">{label}</p>}
              </div>
              {media && (
                <div className="max-lg:!max-w-full w-full h-full">
                  <div className="overflow-hidden h-full" style={{ aspectRatio: "1/1" }}>
                    <SanityMedia media={media} className="size-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid-span-12 lg:grid-span-5 lg:grid-start-7 ">
            <div className="flex h-full flex-col justify-end items-start gap-16">
              <List items={items} className="w-full" animated pushEffect />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
