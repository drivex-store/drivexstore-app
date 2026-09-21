import { SanityRichText } from "@libs/sanity/components/SanityRichText";

export default function LegalPageSection({ theme, richText }) {
  if (!richText) return null;

  return (
    <div
      data-theme={theme || "light"}
      data-page-builder-section="textSection"
      data-selector="text-narrow"
      className="bg-background pt-80 lg:pt-160 pb-80 lg:pb-160"
    >
      <div className="grid-container">
        <div className="grid-layout">
          <div className="grid-span-12">
            <SanityRichText value={richText} />
          </div>
        </div>
      </div>
    </div>
  );
}