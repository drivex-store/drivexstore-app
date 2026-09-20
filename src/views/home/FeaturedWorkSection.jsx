import FeaturedWorkSectionClient from "@views/components/FeaturedWorkSectionClient";

export default function FeaturedWorkSection({ data }) {
  if (!data?.content?.caseStudies?.length) {
    return null;
  }

  return (
<section
  data-theme="dark"
  data-page-builder-section="featuredWorkSection"
  className="bg-background pt-64 lg:pt-128 pb-64 lg:pb-128">
      <FeaturedWorkSectionClient section={data} />
    </section>
  );
}
