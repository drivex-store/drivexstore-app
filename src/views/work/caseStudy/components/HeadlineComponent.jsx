import { ScrollAnimatedHeadline } from "@animations/components/ScrollAnimatedHeadline";
import { cx } from "@libs/vendor";
import { selfAlignClass } from "./selfAlign";

export function HeadlineComponent({ headline, selfAlign }) {
  if (!headline?.text) return null;

  return (
    <div className={cx(selfAlignClass(selfAlign))}>
      <ScrollAnimatedHeadline headline={headline} />
    </div>
  );
}
