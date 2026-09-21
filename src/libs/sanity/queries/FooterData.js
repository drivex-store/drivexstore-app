import { sanityClient } from "@libs/sanity/client";
import { linkProjection, linkFieldMarkDefProjection } from "@libs/sanity/queries/fragments/link";

const imageProjection = `{
  "_id": asset->_id,
  "_rev": asset->_rev,
  "altText": coalesce(alt, asset->altText),
  "crop": crop,
  "description": asset->description,
  "dimensions": asset->metadata.dimensions,
  "hotspot": hotspot,
  "lqip": asset->metadata.lqip,
  "title": asset->title
}`;

const richTextProjection = `[]{
  ...,
  markDefs[]{
    ...,
    ${linkFieldMarkDefProjection}
  }
}`;

const FOOTER_QUERY = `*[_type == "footer"][0]{
  navigation{
    availability,
    items[]{
      _key,
      text,
      "link": link${linkProjection}
    },
    title
  },
  "contactInformation": contactInformation${richTextProjection},
  "copyrightNotice": copyrightNotice${richTextProjection},
  "asciiImageLeft": asciiImageLeft${imageProjection},
  "asciiDepthMapLeft": asciiDepthMapLeft${imageProjection},
  asciiColorLeft,
  asciiColorDarkLeft,
  asciiCellSizeLeft,
  asciiParallaxIntensityLeft,
  asciiRevealOriginXLeft,
  asciiRevealOriginYLeft,
  "asciiMobileFallbackLeft": asciiMobileFallbackLeft${imageProjection},
  "asciiImage": asciiImage${imageProjection},
  "asciiDepthMap": asciiDepthMap${imageProjection},
  asciiColor,
  asciiColorDark,
  asciiCellSize,
  asciiParallaxIntensity,
  asciiRevealOriginX,
  asciiRevealOriginY,
  "asciiMobileFallback": asciiMobileFallback${imageProjection},
  showWatermark,
  spotsRemaining
}`;

export async function getFooterData() {
  return sanityClient.fetch(FOOTER_QUERY, {}, { next: { revalidate: 60 } });
}
