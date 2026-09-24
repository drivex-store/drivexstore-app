import { notFound } from "next/navigation";
import PrivacyPolicyPageSection from "@views/privacy-policy/PrivacyPolicyPageSection";
import { getPrivacyPolicyPageSectionSlug, getAllPrivacyPolicyPageSectionSlug } from "@libs/sanity/queries/privacy-policy/PrivacyPolicyPageData";

const SLUG = "privacy-policy";

const sectionRegistry = {
  textSectionField: PrivacyPolicyPageSection,
};

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyPageSectionSlug(SLUG);

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

export async function generateMetadata() {
  const page = await getPrivacyPolicyPageSectionSlug(SLUG);

  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.seoMetadata?.title || page.title,
    description: page.seoMetadata?.description,
  };
}
