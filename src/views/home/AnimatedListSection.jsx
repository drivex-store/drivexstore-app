import { cx } from '@libs/vendor';
import AnimatedListSectionClient from "@views/components/AnimatedListSectionClient";

export default function AnimatedListSection({ data }) {
  if (!data?.items?.length) {
    return null;
  }

  return (
    <section
      data-theme="light"
      data-page-builder-section="animatedListSection"
      className="bg-background pt-64 lg:pt-128 pb-64 lg:pb-128">
      <AnimatedListSectionClient
        headline={data.headline}
        label={data.label}
        text={data.text}
        items={data.items}
        variant={data.variant}
        headlineDisplay={data.headlineDisplay}
        fixedMedia={data.fixedMedia}
      />
    </section>
  );
}
