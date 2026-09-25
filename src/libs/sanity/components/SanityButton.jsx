import { AnimatedButton } from "@animations/components/AnimatedButton"; 
import { AnimatedLink } from '@animations/components/AnimatedLink';
import { SanityLink } from "@libs/sanity/components/SanityLink"; 

export function SanityButton({ button, className }) {
  const link = button.link;
  const hasDestination = Boolean(link?.href) || (link?.type === "modal" && Boolean(link?.modalId));
  if (!hasDestination) return null;

  if (button.variant === "link") {
    const isExternal = button.link.type === "external";
    return (
      <AnimatedLink asChild={true} indicator={isExternal} className={className}>
        <SanityLink link={button.link}>{button.link.text}</SanityLink>
      </AnimatedLink>
    );
  }

  return (
    <AnimatedButton
      size={button.size}
      theme={button.theme}
      asChild={true}
      className={className}
    >
      <SanityLink link={button.link}>{button.link.text}</SanityLink>
    </AnimatedButton>
  );
}
