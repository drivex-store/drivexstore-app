import { cx } from "@libs/vendor";
import { componentRegistry } from "./componentRegistry";

// [mobile, desktop] px values, matching the pt-64 lg:pt-128 pattern used
// throughout the rest of the site (ContentBlockSection, ProjectInfoSection).
const PADDING_MAP = {
  none: [0, 0],
  sm: [16, 24],
  md: [32, 48],
  lg: [64, 128],
  xl: [64, 128],
};
const SPACE_BETWEEN_CLASSES = {
  0: "gap-0", 4: "gap-4", 8: "gap-8", 16: "gap-16", 24: "gap-24", 32: "gap-32",
  48: "gap-48", 64: "gap-64", 80: "gap-80",
};
const H_ALIGN_MAP = { start: "items-start", center: "items-center", end: "items-end" };
const V_ALIGN_MAP = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };

function paddingClass(prefix, size) {
  const pair = PADDING_MAP[size];
  if (!pair) return "";
  const [mobile, desktop] = pair;
  return `${prefix}-${mobile} lg:${prefix}-${desktop}`;
}

function Column({ column }) {
  const {
    columnStart,
    columnSpan,
    horizontalAlignment = "start",
    verticalAlignment = "start",
    spaceBetween,
    components = [],
  } = column;

  return (
    <div
      className={cx(
        "grid-span-12",
        columnSpan && `lg:grid-span-${columnSpan}`,
        columnStart && `lg:grid-start-${columnStart}`
      )}
    >
      <div
        className={cx(
          "flex h-full flex-col",
          H_ALIGN_MAP[horizontalAlignment] ?? "items-start",
          V_ALIGN_MAP[verticalAlignment] ?? "justify-start",
          SPACE_BETWEEN_CLASSES[Number(spaceBetween)] ?? "gap-16"
        )}
      >
        {components.map((component) => {
          const Component = componentRegistry[component._type];
          if (!Component) {
            console.warn(`ColumnLayoutSectionField: no component registered for "${component._type}"`);
            return null;
          }
          return <Component key={component._key} {...component} />;
        })}
      </div>
    </div>
  );
}

export function ColumnLayoutSectionField({ sectionContent }) {
  if (!sectionContent?.columns?.length) return null;

  const { theme = "light", paddingTop = "xl", paddingBottom = "xl", columns } = sectionContent;

  return (
    <section
      data-theme={theme}
      data-page-builder-section="columnLayoutSectionField"
      className={cx("bg-background", paddingClass("pt", paddingTop), paddingClass("pb", paddingBottom))}
    >
      <div className="grid-container">
        <div className="grid-layout gap-y-48">
          {columns.map((column, index) => (
            <Column key={column._key ?? index} column={column} />
          ))}
        </div>
      </div>
    </section>
  );
}
