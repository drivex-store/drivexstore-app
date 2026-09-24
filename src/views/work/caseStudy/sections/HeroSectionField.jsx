import HeroParallax from "@views/components/HeroParallax";
import HeroTextOnly from "@views/components/HeroTextOnly";
import { cx } from "@libs/vendor";

// Renders the caseStudy pageBuilder's heroSectionField. `parallax`/`standard`
// variants reuse the same HeroParallax used by the site-wide project hero;
// `textOnly` (no media) falls back to the plain centered hero used on other
// pages. The ascii-art fields on this section (asciiColor, asciiCellSize,
// stretchIntensity, parallaxIntensity) have no corresponding visual effect in
// this app yet — no ascii-hero variant is implemented here — so they are
// accepted by the schema but intentionally unused for now.
export function HeroSectionField({ sectionContent }) {
  if (!sectionContent) return null;

  const {
    theme = "dark",
    variant = "parallax",
    headline,
    headlineDisplay,
    subtext,
    showScrollText,
    scrollText,
    parallaxMedia,
    ctas,
  } = sectionContent;

  if (variant === "textOnly" || !parallaxMedia?.type) {
    return (
      <section data-theme={theme} data-page-builder-section="heroSectionField" className="relative bg-background pt-64 lg:pt-128 pb-24 lg:pb-48">
        <HeroTextOnly
          headline={headline?.text}
          headlineLevel={headline?.level}
          headlineDisplay={headlineDisplay}
          subtext={subtext}
        />
      </section>
    );
  }

  return (
    <section data-theme={theme} data-page-builder-section="heroSectionField" className={cx("relative overflow-hidden bg-background pt-0 pb-0")}>
      <HeroParallax
        media={parallaxMedia}
        headline={headline?.text}
        headlineLevel={headline?.level}
        headlineDisplay={headlineDisplay}
        subtext={subtext}
        ctas={ctas}
        scrollText={showScrollText !== false ? scrollText : undefined}
      />
    </section>
  );
}
