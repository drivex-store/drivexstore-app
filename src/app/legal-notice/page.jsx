import { notFound } from "next/navigation";
import { LegalNoticeTextSection } from "@views/legal-notice/LegalNoticePageSection";
import { LegalNoticeTabsSection } from "@views/legal-notice/LegalNoticeTabsSection";
import { getLegalNoticePageSectionSlug, getAllLegalNoticePageSectionSlug } from "@libs/sanity/queries/legal-notice/LegalNoticePageData";

const SLUG = "legal-notice";

export default async function LegalNoticePage() {
  const page = await getLegalNoticePageSectionSlug(SLUG);

  if (!page) {
    notFound();
  }

  const sections = page.pageBuilder?.sectionsArray || [];

  return sections.map((section) => {
    const key = section._key;

    if (section._type === "textSectionField") {
      return (
        <LegalNoticeTextSection
          key={key}
          theme={section.sectionContent?.theme}
          selector={section.sectionSettings?.customSelector}
          content={section.sectionContent?.appRichText}
        />
      );
    }

    if (section._type === "tabsSectionField") {
      return (
        <LegalNoticeTabsSection
          key={key}
          theme={section.sectionContent?.theme}
          sectionHeadline={section.sectionContent?.sectionHeadline}
          paddingTop={section.sectionContent?.paddingTop}
          paddingBottom={section.sectionContent?.paddingBottom}
          items={section.sectionContent?.items}
        />
      );
    }

    console.warn(
      `LegalNoticePage: no component registered for sectionType "${section._type}"`
    );
    return null;
  });
}

export async function generateMetadata() {
  const page = await getLegalNoticePageSectionSlug(SLUG);

  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.seoMetadata?.title || page.title,
    description: page.seoMetadata?.description,
  };
}
