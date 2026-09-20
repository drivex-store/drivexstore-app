import { sanityClient } from "@libs/sanity/client";

const CONTACT_CTA_CONTENT_BLOCK_ID = "contentBlockSection-contact-cta";

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

// One combined GROQ query — each top-level key below is its own
// independent `*[_type == "..."][0]{...}` lookup, so this still returns
// exactly the same shape each section used to fetch on its own; it's
// just issued as a single request instead of seven.
const HOME_PAGE_QUERY = `{
  "hero": *[_type == "heroSection"][0]{
    "headline": content.headline,
    "headlineLevel": content.headlineLevel,
    "headlineDisplay": content.headlineDisplay,
    "subtext": content.subtext,
    "ctas": content.ctas{
      layout,
      gap,
      buttons[]{
        _key,
        variant,
        theme,
        size,
        "link": link${linkProjection}
      }
    },
    "trustedBy": content.trustedBy{
      title,
      items[]{
        _key,
        _type,
        _type == "image" => {
          alt,
          variant,
          "image": image${imageProjection}
        },
        _type == "svgItem" => {
          alt,
          variant,
          svgCode
        },
        _type == "reference" => {
          "svgCode": @->svgCode,
          "alt": @->title,
          "variant": "logo"
        },
        _type == "textItem" => {
          text
        }
      }
    },
    "asciiImage": content.asciiImage${imageProjection},
    "asciiDepthMap": content.asciiDepthMap${imageProjection},
    "asciiColor": content.asciiColor,
    "asciiColorDark": content.asciiColorDark,
    "asciiCellSize": content.asciiCellSize,
    "asciiParallaxIntensity": content.asciiParallaxIntensity,
    "asciiRevealOriginX": content.asciiRevealOriginX,
    "asciiRevealOriginY": content.asciiRevealOriginY,
    "asciiMobileFallback": content.asciiMobileFallback${imageProjection}
  },
  "cards": *[_type == "cardsSection"][0]{
    theme,
    pageBuilderSection,
    className,
    fullHeight,
    "cards": content.cards[]{
      _key,
      _type,
      _type == "textCard" => {
        cardTheme,
        "headline": headline{
          level,
          text
        },
        headlineDisplay,
        plainText,
        text
      },
      _type == "mediaCard" => {
        alt,
        "media": media${mediaProjection}
      }
    }
  },
  "animatedList": *[_type == "animatedListSection"][0]{
    theme,
    pageBuilderSection,
    className,
    "headline": content.headline{
      level,
      text
    },
    "label": content.label,
    "text": content.text,
    "items": content.items[]{
      _key,
      alt,
      headline,
      "image": image${imageProjection},
      text
    },
    "variant": content.variant,
    "headlineDisplay": content.headlineDisplay,
    "fixedMedia": content.fixedMedia${mediaProjection}
  },
  "featuredWork": *[_type == "featuredWorkSection"][0]{
    theme,
    pageBuilderSection,
    className,
    "content": {
      "headline": content.headline,
      "text": content.text,
      "paddingTop": content.paddingTop,
      "paddingBottom": content.paddingBottom,
      "viewAllButton": content.viewAllButton{
        "link": link${linkProjection},
        size,
        theme,
        variant
      },
      "caseStudies": content.caseStudies[]->{
        _id,
        title,
        "uri": "/work/" + slug.current,
        tags,
        "thumbnail": image${imageProjection},
        "featuredMedia": {
          "type": "image",
          "aspectRatio": image.asset->metadata.dimensions.aspectRatio,
          "highResolution": false,
          "image": image${imageProjection},
          "video": null,
          "externalVideoUrl": null,
          "videoOptions": null
        }
      }
    }
  },
  "indexedGrid": *[_type == "indexedGridSection"][0]{
    _id,
    _type,
    headline {
      level,
      text
    },
    text,
    label,
    items[]{
      _key,
      "caseStudy": caseStudy->{
        title
      },
      title,
      description
    },
    variant
  },
  "accordion": *[_type == "accordionSection"][0]{
    theme,
    pageBuilderSection,
    className,
    content{
      "headline": headline{
        level,
        text
      },
      text,
      allowMultiple,
      "items": items[]{
        _key,
        headline,
        text
      }
    }
  },
  "contentBlock": *[_type == "contentBlockSection" && _id == "${CONTACT_CTA_CONTENT_BLOCK_ID}"][0]{
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
    "primaryCta": content.ctas.primary{ variant, theme, size, link },
    "secondaryCta": content.ctas.secondary{ variant, theme, size, link },
    "footnote": content.footnote
  }
}`;

export async function getHomePageData() {
  return sanityClient.fetch(HOME_PAGE_QUERY, {}, { next: { revalidate: 60 } });
}
