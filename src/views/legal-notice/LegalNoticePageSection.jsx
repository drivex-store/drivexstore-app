import { PortableText } from "@portabletext/react";
import { AnimatedProse } from "@animations/components/AnimatedProse";
import { AnimatedText } from "@animations/components/AnimatedText";

const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-24 text-h4 first:mt-0 lg:mt-32">
        <AnimatedText>{children}</AnimatedText>
      </h2>
    ),
    normal: ({ children }) => (
      <div className="text-body empty:hidden" data-paragraph="true">
        <AnimatedText>{children}</AnimatedText>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="flex list-none flex-col gap-8 text-body">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-8">
        <span
          className="mt-[0.5em] size-4 shrink-0 rounded-full bg-current"
          aria-hidden="true"
        />
        <AnimatedText>{children}</AnimatedText>
      </li>
    ),
  },
};

export function LegalNoticeTextSection({
  theme,
  selector,
  className,
  content,
}) {
  if (!content) return null;

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
              <PortableText
                value={content}
                components={portableTextComponents}
              />
            </AnimatedProse>
          </div>
        </div>
      </div>
    </div>
  );
}
