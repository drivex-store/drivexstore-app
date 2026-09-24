import { cx } from "@libs/vendor";

const SPACING_MAP = {
  none: "0",
  sm: "16",
  md: "32",
  lg: "64",
  xl: "128",
};

function spacingClass(prefix, size) {
  const value = SPACING_MAP[size];
  if (value === undefined) return "";
  return `${prefix}-${value}`;
}

export function DividerComponent({ orientation = "horizontal", paddingTop, paddingBottom }) {
  if (orientation === "vertical") {
    return (
      <div
        className={cx(
          "h-full w-px self-stretch bg-border",
          spacingClass("ml", paddingTop),
          spacingClass("mr", paddingBottom)
        )}
      />
    );
  }

  return (
    <div className={cx("w-full", spacingClass("pt", paddingTop), spacingClass("pb", paddingBottom))}>
      <hr className="w-full border-border border-t" />
    </div>
  );
}
