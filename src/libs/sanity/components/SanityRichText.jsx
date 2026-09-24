import React from 'react';
import { PortableText } from '@portabletext/react';
import { stegaClean } from '@sanity/client/stega';
import { AnimatedProse } from '@animations/components/AnimatedProse'; 
import { AnimatedText } from '@animations/components/AnimatedText'; 
import { InnerParallax } from '@features/parallaxs/InnerParallax';
import { SanityMedia } from '@libs/sanity/components/SanityMedia';
import { SanityLink } from '@libs/sanity/components/SanityLink';
import { cx } from '@libs/vendor';


const blockComponents = {
  mediaBlock: function ({ value, className }) {
    if (!value) return null;
    const { media, caption } = value;
    const aspectRatio = media?.aspectRatio ?? undefined;

    return (
      <figure
        className={cx("flex flex-col gap-16", className)}
        data-rich-text-block="mediaBlock"
      >
        <InnerParallax overflow="60 lg:120" style={{ aspectRatio }}>
          <SanityMedia media={media} className="size-full" />
        </InnerParallax>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }
};

function extractTextFromChildren(children) {
  return React.Children.toArray(children).map(child => {
    if (typeof child === "string") return child;
    if (
      React.isValidElement(child) &&
      typeof child.props === "object" &&
      child.props !== null &&
      "children" in child.props
    ) {
      return child.props.children;
    }
    return null;
  });
}

function mapNumberListItem(text, index) {
  return (
    <li className="flex items-start gap-8" key={`list-${index}-${text}`}>
      <span className="shrink-0 text-foreground-muted">{index + 1}.</span>
      <AnimatedText>{text}</AnimatedText>
    </li>
  );
}

function NumberList({ children }) {
  return (
    <ol className="flex list-none flex-col gap-8 text-body">
      {extractTextFromChildren(children).map(mapNumberListItem)}
    </ol>
  );
}

function mapBulletListItem(text, index) {
  return (
    <li className="flex items-start gap-8" key={`list-${index}-${text}`}>
      <span
        className="mt-[0.5em] size-4 shrink-0 rounded-full bg-current"
        aria-hidden="true"
      />
      <AnimatedText>{text}</AnimatedText>
    </li>
  );
}

function BulletList({ children }) {
  return (
    <ul className="flex list-none flex-col gap-8 text-body">
      {extractTextFromChildren(children).map(mapBulletListItem)}
    </ul>
  );
}

function H4Block({ children }) {
  return (
    <h4 className="mt-8 text-h6 first:mt-0 lg:mt-16">
      <AnimatedText>{children}</AnimatedText>
    </h4>
  );
}

function H3Block({ children }) {
  return (
    <h3 className="mt-16 text-h5 first:mt-0 lg:mt-24">
      <AnimatedText>{children}</AnimatedText>
    </h3>
  );
}

function H2Block({ children }) {
  return (
    <h2 className="mt-24 text-h4 first:mt-0 lg:mt-32">
      <AnimatedText>{children}</AnimatedText>
    </h2>
  );
}

function NormalBlock({ children }) {
  return (
    <div className="text-body empty:hidden" data-paragraph={true}>
      <AnimatedText>{children}</AnimatedText>
    </div>
  );
}

function LinkField({ value, children }) {
  return (
    <SanityLink
      link={value}
      className="group relative no-underline outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:text-brand transition-colors duration-300"
    >
      {children}
    </SanityLink>
  );
}


function HighlightColorField({ value, children }) {
  return (
    <span
      style={{ "--color-value": stegaClean(value.color) }}
      className="bg-(--color-value) text-inherit"
    >
      {children}
    </span>
  );
}

function TextColorField({ value, children }) {
  return (
    <span
      style={{ "--color-value": stegaClean(value.color) }}
      className="bg-inherit text-(--color-value)"
    >
      {children}
    </span>
  );
}

function Sup({ children }) {
  return <sup className="text-[0.6em]">{children}</sup>;
}

function Underline({ children }) {
  return <em className="not-italic underline underline-offset-2">{children}</em>;
}

function Strong({ children }) {
  return <strong className="font-bold">{children}</strong>;
}

function Em({ children }) {
  return <em className="italic">{children}</em>;
}

function InlineMediaField({ value }) {
  const media = value.media;
  return media ? (
    <SanityMedia
      media={media}
      width={100}
      autoPlay={true}
      loop={true}
      videoProps={{ noControls: true, muted: true, playsInline: true }}
      className="inline-flex h-[1em] w-auto align-middle"
    />
  ) : null;
}

export function SanityRichText({ value, className }) {
  if (!value) return null;

  const components = {
    types: {
      ...blockComponents,
      inlineMediaField: InlineMediaField
    },
    marks: {
      em: Em,
      strong: Strong,
      underline: Underline,
      sup: Sup,
      textColorField: TextColorField,
      highlightColorField: HighlightColorField,
      linkField: LinkField
    },
    block: {
      normal: NormalBlock,
      h2: H2Block,
      h3: H3Block,
      h4: H4Block
    },
    list: {
      bullet: BulletList,
      number: NumberList
    }
  };

  return (
    <AnimatedProse className={cx("flex flex-col gap-16", className)}>
      <PortableText
        value={value}
        onMissingComponent={false}
        components={components}
      />
    </AnimatedProse>
  );
}

