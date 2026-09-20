import { sanityClient } from "@libs/sanity/client";

const imageProjection = `{
  "_id": asset->_id,
  "_rev": asset->_rev,
  "url": asset->url,
  "altText": coalesce(alt, asset->altText),
  "crop": crop,
  "description": asset->description,
  "dimensions": asset->metadata.dimensions,
  "hotspot": hotspot,
  "lqip": asset->metadata.lqip,
  "title": asset->title
}`;

const videoProjection = `{
  "playbackId": asset->playbackId,
  "dimensions": {
    "width": asset->data.tracks[0].max_width,
    "height": asset->data.tracks[0].max_height,
    "aspectRatio": asset->data.aspect_ratio
  },
  "thumbTime": thumbTime
}`;

const mediaProjection = `{
  type,
  aspectRatio,
  highResolution,
  "image": image${imageProjection},
  "video": video${videoProjection},
  externalVideoUrl,
  videoOptions
}`;

const linkProjection = `{
  canDownload,
  href,
  modalId,
  openInNewTab,
  text,
  type
}`;

const CONTENT_BLOCK_SECTION_QUERY = `*[_type == "contentBlockSection" && _id == $id][0]{
  theme,
  selector,
  className,
  layout,
  "headline": content.headline{ level, text },
  "headlineDisplay": content.headlineDisplay,
  "secondaryHeadline": content.secondaryHeadline{ level, text },
  "media": content.media${mediaProjection},
  "mediaSize": content.mediaSize,
  "text": content.text,
  "primaryCta": content.ctas.primary{ variant, theme, size, "link": link${linkProjection} },
  "secondaryCta": content.ctas.secondary{ variant, theme, size, "link": link${linkProjection} },
  "footnote": content.footnote
}`;

export async function getContentBlockSectionData(id) {
  if (!id) return null;
  return sanityClient.fetch(
    CONTENT_BLOCK_SECTION_QUERY,
    { id },
    { next: { revalidate: 60 } }
  );
}
