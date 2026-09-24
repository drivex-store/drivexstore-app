import { sanityClient } from "@libs/sanity/client";

const imageProjection = `{
  "_id": asset->_id, "_rev": asset->_rev,
  "altText": coalesce(alt, asset->altText), "crop": crop,
  "description": asset->description, "dimensions": asset->metadata.dimensions,
  "hotspot": hotspot, "lqip": asset->metadata.lqip, "title": asset->title
}`;

const mediaProjection = `{
  type,
  aspectRatio,
  "image": image${imageProjection},
  externalVideoUrl
}`;

const NEXT_CASE_STUDY_QUERY = `{
  "current": *[_type == "caseStudy" && slug.current == $slug][0]{
    "relatedSlug": relatedWorks[0]->slug.current,
    "relatedTitle": relatedWorks[0]->title,
    "relatedMainImage": relatedWorks[0]->mainImage${mediaProjection}
  },
  "all": *[_type == "caseStudy"] | order(_createdAt asc){
    "slug": slug.current,
    title,
    "mainImage": mainImage${mediaProjection}
  }
}`;

export async function getNextCaseStudy(slug) {
  const { current, all } = await sanityClient.fetch(
    NEXT_CASE_STUDY_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (current?.relatedSlug && current.relatedSlug !== slug) {
    return {
      uri: `/work/${current.relatedSlug}`,
      title: current.relatedTitle,
      mainImage: current.relatedMainImage,
    };
  }

  if (!all?.length) return null;

  const currentIndex = all.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return null;

  const next = all[(currentIndex + 1) % all.length];
  if (!next || next.slug === slug) return null;

  return {
    uri: `/work/${next.slug}`,
    title: next.title,
    mainImage: next.mainImage,
  };
}
