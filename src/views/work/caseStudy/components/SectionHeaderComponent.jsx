import { ScrollAnimatedHeadline } from "@animations/components/ScrollAnimatedHeadline";

export function SectionHeaderComponent({ label, headline }) {
  if (!label && !headline?.text) return null;

  return (
    <div className="flex flex-col gap-8">
      {label && <p className="section-label !text-foreground">{label}</p>}
      {headline?.text && <ScrollAnimatedHeadline headline={headline} />}
    </div>
  );
}
