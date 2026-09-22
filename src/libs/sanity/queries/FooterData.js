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
  navigation->{
    title,
    navId,
    "availability": flyoutAvailability, 
    flyoutCenterImage {
      caption,
      "image": image${imageProjection},
      "link": link${linkProjection}
    },
    flyoutContact,
    flyoutFeaturedProject {
      caption,
      project->
    },
    flyoutLocation,
    flyoutSocials,
    flyoutTeam,
    "headerCta": headerCta${linkProjection},
    items[]{
      _key,
      text,
      "link": navigationItemUrl${linkProjection}
    }
  },
  "leftText": leftText${richTextProjection},
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
  showWatermark
}`;

export async function getFooterData() {
  return sanityClient.fetch(FOOTER_QUERY, {}, { next: { revalidate: 60 } });
}
