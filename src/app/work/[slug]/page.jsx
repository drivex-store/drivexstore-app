import { notFound } from "next/navigation";
import { NextProjectSection } from "@views/components/NextProjectSection";
import { caseStudySectionRegistry } from "@features/page-builder/caseStudySectionRegistry";
import { getCaseStudyData } from "@libs/sanity/queries/WorkPage/CaseStudy/CaseStudyData";
import { getNextCaseStudy } from "@libs/sanity/queries/WorkPage/CaseStudy/NextCaseStudyData";

function CaseStudySections({ sections }) {
  if (!sections?.length) return null;

  return sections.map((section, index) => {
    const Component = caseStudySectionRegistry[section._type];
    if (!Component) {
      console.warn(
        `WorkDetailPage: no component registered for section type "${section._type}"`
      );
      return null;
    }

    const key = section._key || `${section._type}-${index}`;
    return <Component key={key} {...section} />;
  });
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const [caseStudy, nextCaseStudy] = await Promise.all([
    getCaseStudyData(slug),
    getNextCaseStudy(slug),
  ]);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <CaseStudySections sections={caseStudy.sections} />
      {nextCaseStudy && <NextProjectSection nextProject={nextCaseStudy} />}
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyData(slug);

  if (!caseStudy) {
    return { title: "Not found" };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.projectInfo?.teaserText ?? undefined,
  };
}
