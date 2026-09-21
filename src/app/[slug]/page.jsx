import { notFound } from "next/navigation";
import LegalPageSection from "@views/legal/LegalPageSection";
import { getLegalPageBySlug, getAllLegalPageSlugs } from "@libs/sanity/queries/LegalPage/LegalPageData";

const sectionRegistry = {
  textSection: LegalPageSection,
};

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (page.pageBuilder || []).map((section, index) => {
    const Component = sectionRegistry[section.sectionType];
    if (!Component) return null;
    return (
      <Component
        key={index}
        theme={section.theme}
        selector={section.selector}
        className={section.className}
        content={section.content}
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

  return { title: page.title };
}
