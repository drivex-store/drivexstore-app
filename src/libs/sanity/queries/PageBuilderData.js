import { sanityClient } from "@libs/sanity/client";

const PAGE_BUILDER_QUERY = `*[_type == $docType][0]{
  pageBuilder[]{
    _key,
    sectionType,
    enabled,
    "contentBlockId": contentBlockRef._ref
  }
}`;

export async function getPageBuilderSections(docType) {
  const data = await sanityClient.fetch(
    PAGE_BUILDER_QUERY,
    { docType },
    { next: { revalidate: 60 } }
  );

  return data?.pageBuilder?.length ? data.pageBuilder : null;
}
