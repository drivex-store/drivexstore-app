import { cx } from "@libs/vendor";
import { SanityMedia } from "@libs/sanity/components/SanityMedia";

const PADDING_MAP = {
  none: [0, 0],
  sm: [16, 24],
  md: [32, 48],
  lg: [64, 128],
  xl: [64, 128],
};

function paddingClass(prefix, size) {
  const pair = PADDING_MAP[size];
  if (!pair) return "";
  const [mobile, desktop] = pair;
  return `${prefix}-${mobile} lg:${prefix}-${desktop}`;
}

export function MediaSectionField({ sectionContent }) {
  if (!sectionContent?.appMedia?.type) return null;

  const { theme = "light", paddingTop = "none", paddingBottom = "none", appMedia } = sectionContent;

  return (
    <section
      data-theme={theme}
      data-page-builder-section="mediaSectionField"
      className={cx("bg-background", paddingClass("pt", paddingTop), paddingClass("pb", paddingBottom))}
    >
      <SanityMedia
        media={appMedia}
        className="w-full"
        autoPlay={appMedia.videoOptions?.autoPlay}
        loop={appMedia.videoOptions?.loop}
        videoProps={{ noControls: appMedia.videoOptions?.controls === false }}
      />
    </section>
  );
}
