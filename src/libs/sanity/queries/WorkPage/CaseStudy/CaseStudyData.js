import { sanityClient } from "@libs/sanity/client";
import { caseStudyLinkProjection } from "@libs/sanity/queries/fragments/caseStudyLink";

const imageProjection = `{
  "_id": asset->_id, "_rev": asset->_rev,
  "altText": coalesce(alt, asset->altText), "crop": crop,
  "description": asset->description, "dimensions": asset->metadata.dimensions,
  "hotspot": hotspot, "lqip": asset->metadata.lqip, "title": asset->title
}`;

const caseStudyMediaProjection = `{
  type,
  aspectRatio,
  "image": image${imageProjection},
  externalVideoUrl
}`;
const appMediaProjection = `{
  type,
  aspectRatio,
  "image": image${imageProjection},
  externalVideoUrl,
  "videoOptions": videoOptions{ autoPlay, controls, loop, muted }
}`;

const headlineProjection = `{ level, text }`;

const buttonProjection = `{
  _key,
  "link": link${caseStudyLinkProjection},
  size,
  theme,
  variant
}`;

const buttonGroupProjection = `{
  "buttons": buttons[]${buttonProjection},
  layout,
  gap
}`;

const componentsProjection = `{
  _key,
  _type,
  _type == "headlineComponent" => {
    "headline": headline${headlineProjection},
    selfAlign
  },
  _type == "textComponent" => {
    text,
    selfAlign
  },
  _type == "buttonComponent" => {
    "button": button${buttonProjection},
    selfAlign
  },
  _type == "imageComponent" => {
    "image": {
      "type": image.type,
      "image": image.image${imageProjection}
    },
    aspectRatio,
    maxWidth
  },
  _type == "listComponent" => {
    animated,
    pushEffect,
    "items": items[]{ _key, text, isHighlighted }
  },
  _type == "dividerComponent" => {
    orientation,
    paddingTop,
    paddingBottom
  },
  _type == "buttonGroupComponent" => {
    "buttonGroup": buttonGroup${buttonGroupProjection},
    selfAlign
  },
  _type == "accentTextComponent" => {
    text,
    color,
    size
  },
  _type == "sectionHeaderComponent" => {
    label,
    "headline": headline${headlineProjection}
  },
  _type == "cardsComponent" => {
    fullHeight,
    "cards": cards[]{
      _key,
      _type,
      cardTheme,
      "headline": headline${headlineProjection},
      text
    }
  }
}`;

const columnsProjection = `{
  columnStart,
  columnSpan,
  horizontalAlignment,
  verticalAlignment,
  spaceBetween,
  "components": components[]${componentsProjection}
}`;

const sectionsProjection = `{
  _key,
  _type,
  _type == "heroSectionField" => {
    "sectionContent": sectionContent{
      theme,
      variant,
      paddingTop,
      paddingBottom,
      "headline": headline${headlineProjection},
      headlineDisplay,
      subtext,
      showScrollText,
      scrollText,
      enableStretch,
      stretchIntensity,
      parallaxIntensity,
      asciiCellSize,
      asciiColor,
      "parallaxMedia": parallaxMedia${caseStudyMediaProjection},
      "ctas": ctas{ layout, gap }
    }
  },
  _type == "columnLayoutSectionField" => {
    "sectionContent": sectionContent{
      theme,
      paddingTop,
      paddingBottom,
      "columns": columns[]${columnsProjection}
    }
  },
  _type == "gallerySectionField" => {
    "sectionContent": sectionContent{
      theme,
      gap,
      "items": items[]{
        columnStart,
        columnSpan,
        "media": media${caseStudyMediaProjection}
      }
    }
  },
  _type == "mediaSectionField" => {
    "sectionContent": sectionContent{
      theme,
      paddingTop,
      paddingBottom,
      "appMedia": appMedia${appMediaProjection}
    }
  }
}`;

const CASE_STUDY_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  tags,
  "mainImage": mainImage${caseStudyMediaProjection},
  "projectInfo": projectInfo{
    "projectTitle": projectTitle${headlineProjection},
    projectUrl,
    "stats": stats{ location, timeline, year, techStack },
    "teaserHeadline": teaserHeadline${headlineProjection},
    teaserText
  },
  "sections": pageBuilder.sectionsArray[]${sectionsProjection},
  "relatedWorks": relatedWorks[]->{
    "slug": slug.current,
    title,
    "mainImage": mainImage${caseStudyMediaProjection}
  }
}`;

export async function getCaseStudyData(slug) {
  return sanityClient.fetch(
    CASE_STUDY_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );
}
