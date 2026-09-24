import { SanityRichText } from "@libs/sanity/components/SanityRichText";
import { cx } from "@libs/vendor";
import { selfAlignClass } from "./selfAlign";

export function TextComponent({ text, selfAlign }) {
  if (!text) return null;

  return (
    <div className={cx(selfAlignClass(selfAlign))}>
      <SanityRichText value={text} />
    </div>
  );
}
