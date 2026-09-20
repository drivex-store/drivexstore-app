import WorkSliderClient from '@views/work/components/WorkSliderClient'
import { getWorkSliderData } from '@libs/sanity/queries/WorkPage/WorkSliderData'

export default async function WorkSliderSection() {
  const data = await getWorkSliderData();

  if (!data?.content?.caseStudies?.length) {
    return null;
  }

  return (
    <section
      data-theme={data.theme}
      data-page-builder-section="workSliderSection"
      className="bg-background pt-0 pb-64 lg:pb-128"
    >
      <WorkSliderClient section={data} />
    </section>
  );
}
