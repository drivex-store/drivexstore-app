import { cx } from "@libs/vendor";

const COLOR_CLASSES = {
  foreground: "text-foreground",
  brand: "text-brand",
  muted: "text-foreground-muted",
};

const SIZE_CLASSES = {
  small: "text-accent-sm",
  default: "text-accent",
  large: "text-accent-lg",
};

export function AccentTextComponent({ text, color, size }) {
  if (!text) return null;

  return (
    <p className={cx(COLOR_CLASSES[color] ?? COLOR_CLASSES.foreground, SIZE_CLASSES[size] ?? SIZE_CLASSES.default)}>
      {text}
    </p>
  );
}
