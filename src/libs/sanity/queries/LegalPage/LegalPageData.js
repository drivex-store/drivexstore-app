import { sanityClient } from "@libs/sanity/client";
import { linkFieldMarkDefProjection } from "@libs/sanity/queries/fragments/link";

const richTextProjection = `[]{
  ...,
  markDefs[]{
    ...,
    ${linkFieldMarkDefProjection}
  }
}`;

const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && slug.current == $slug][0]{
  _id,
  title,
  theme,
  "richText": richText${richTextProjection}
}`;

const LEGAL_PAGE_SLUGS_QUERY = `*[_type == "legalPage" && defined(slug.current)]{
  "slug": slug.current
}`;

export async function getLegalPageBySlug(slug) {
  return sanityClient.fetch(LEGAL_PAGE_QUERY, { slug }, { next: { revalidate: 60 } });
}

export async function getAllLegalPageSlugs() {
  return sanityClient.fetch(LEGAL_PAGE_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
}
