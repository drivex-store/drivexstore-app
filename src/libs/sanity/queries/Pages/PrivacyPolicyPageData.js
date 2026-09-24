import { sanityClient } from "@libs/sanity/client";

const LEGAL_PAGE_QUERY = `*[_type == "page" && uri.current in [$uri, "/" + $uri]][0]{
  _id,
  title,
  uri,
  seoMetadata,
  pageBuilder {
    sectionsArray[] {
      _key,
      _type,
      sectionSettings,
      sectionContent
    }
  }
}`;

const LEGAL_PAGE_SLUGS_QUERY = `*[_type == "page" && defined(uri.current)]{
  "slug": uri.current
}`;

export async function getPrivacyPolicyPageSectionSlug(slug) {
  const uri = slug.startsWith("/") ? slug : `/${slug}`;
  return sanityClient.fetch(LEGAL_PAGE_QUERY, { uri }, { next: { revalidate: 60 } });
}

export async function getAllPrivacyPolicyPageSectionSlug() {
  const data = await sanityClient.fetch(LEGAL_PAGE_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
  return data.map((item) => ({
    slug: item.slug ? item.slug.replace(/^\//, "") : "",
  }));
}
