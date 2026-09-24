import { SanityButton } from "@libs/sanity/components/SanityButton";
import { cx } from "@libs/vendor";
import { selfAlignClass } from "./selfAlign";

export function ButtonComponent({ button, selfAlign }) {
  if (!button) return null;

  return (
    <div className={cx(selfAlignClass(selfAlign))}>
      <SanityButton button={button} />
    </div>
  );
}
