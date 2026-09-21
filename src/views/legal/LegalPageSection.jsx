import { Fragment } from "react";
import { AnimatedProse } from "@animations/components/AnimatedProse";
import { AnimatedText } from "@animations/components/AnimatedText";

function Heading({ children }) {
  return (
    <h2 className="mt-24 text-h4 first:mt-0 lg:mt-32">
      <AnimatedText>{children}</AnimatedText>
    </h2>
  );
}

function Paragraph({ children }) {
  return (
    <div className="text-body empty:hidden" data-paragraph="true">
      <AnimatedText>{children}</AnimatedText>
    </div>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="flex list-none flex-col gap-8 text-body">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-8">
          <span className="mt-[0.5em] size-4 shrink-0 rounded-full bg-current" aria-hidden="true" />
          <AnimatedText>{item}</AnimatedText>
        </li>
      ))}
    </ul>
  );
}

export default function LegalPageSection({ theme, selector, className, content }) {
  if (!content) return null;
  const { title, lastUpdated, sections = [] } = content;

  return (
    <div
      data-theme={theme || "light"}
      data-page-builder-section="textSection"
      data-selector={selector || "text-narrow"}
      className={className || "bg-background pt-80 lg:pt-160 pb-80 lg:pb-160"}
    >
      <div className="grid-container">
        <div className="grid-layout">
          <div className="grid-span-12">
            <AnimatedProse className="flex flex-col gap-16">
              {title && <Heading>{title}</Heading>}
              {lastUpdated && <Paragraph>{`Last updated: ${lastUpdated}`}</Paragraph>}

              {sections.map((section, i) => (
                <Fragment key={i}>
                  <Heading>{section.heading}</Heading>
                  {section.body && <Paragraph>{section.body}</Paragraph>}
                  <BulletList items={section.list} />
                  {(section.additional || []).map((paragraph, j) => (
                    <Paragraph key={`${i}-${j}`}>{paragraph}</Paragraph>
                  ))}
                </Fragment>
              ))}
            </AnimatedProse>
          </div>
        </div>
      </div>
    </div>
  );
}
