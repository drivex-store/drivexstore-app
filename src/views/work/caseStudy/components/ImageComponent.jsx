import { SanityMedia } from "@libs/sanity/components/SanityMedia";

const ASPECT_RATIO_MAP = {
  auto: undefined,
  "16/9": "16/9",
  "4/3": "4/3",
  "1/1": "1/1",
};

export function ImageComponent({ image, aspectRatio, maxWidth }) {
  if (!image?.image) return null;

  const resolvedAspectRatio =
    ASPECT_RATIO_MAP[aspectRatio] ?? (aspectRatio === "auto" ? undefined : aspectRatio);

  return (
    <div
      className="w-full overflow-hidden"
      style={{ maxWidth: maxWidth || undefined, aspectRatio: resolvedAspectRatio }}
    >
      <SanityMedia media={image} className="h-full w-full object-cover" />
    </div>
  );
}
