import { cx } from "@libs/vendor";
import { SanityMedia } from "@libs/sanity/components/SanityMedia";

export function GallerySectionField({ sectionContent }) {
  if (!sectionContent?.items?.length) return null;

  const { theme = "light", items } = sectionContent;

  return (
    <section data-theme={theme} data-page-builder-section="gallerySectionField" className="bg-background py-64 lg:py-96">
      <div className="grid-container">
        <div className="grid-layout gap-y-16">
          {items.map((item, index) => (
            <div
              key={index}
              className={cx(
                "grid-span-12",
                item.columnSpan && `lg:grid-span-${item.columnSpan}`,
                item.columnStart && `lg:grid-start-${item.columnStart}`
              )}
            >
              <div className="overflow-hidden" style={{ aspectRatio: item.media?.aspectRatio || undefined }}>
                <SanityMedia media={item.media} className="h-full w-full object-cover" autoPlay={true} loop={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
