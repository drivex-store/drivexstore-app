import { notFound } from "next/navigation";
import LegalPageSection from "@views/legal/LegalPageSection";
import { getLegalPageBySlug, getAllLegalPageSlugs } from "@libs/sanity/queries/LegalPage/LegalPageData";

const sectionRegistry = {
  textSectionField: LegalPageSection,
};

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const sections = page.pageBuilder?.sectionsArray || [];

  return sections.map((section) => {
    const Component = sectionRegistry[section._type];
    if (!Component) return null;

    return (
      <Component
        key={section._key}
        theme={section.sectionContent?.theme}
        selector={section.sectionSettings?.customSelector}
        title={section.sectionSettings?.sectionTitle}
        paddingTop={section.sectionContent?.paddingTop}
        paddingBottom={section.sectionContent?.paddingBottom}
        content={section.sectionContent?.appRichText}
      />
    );
  });
}

export async function generateStaticParams() {
  const slugs = await getAllLegalPageSlugs();
  return (slugs || []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.seoMetadata?.title || page.title,
    description: page.seoMetadata?.description,
  };
}
