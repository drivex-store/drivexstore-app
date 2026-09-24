import { ButtonGroup } from "@components/ui/ButtonGroup";
import { cx } from "@libs/vendor";
import { selfAlignClass } from "./selfAlign";

export function ButtonGroupComponent({ buttonGroup, selfAlign }) {
  if (!buttonGroup?.buttons?.length) return null;

  return (
    <div className={cx(selfAlignClass(selfAlign))}>
      <ButtonGroup buttonGroup={buttonGroup} />
    </div>
  );
}
