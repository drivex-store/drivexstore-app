import { sanityClient } from "@libs/sanity/client";

const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && slug.current == $slug][0]{
  _id,
  title,
  pageBuilder[]{
    sectionType,
    theme,
    selector,
    className,
    content
  }
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
