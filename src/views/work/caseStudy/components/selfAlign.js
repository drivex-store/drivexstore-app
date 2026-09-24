// Maps the caseStudy schema's `selfAlign` option to flex alignment utilities.
// Columns in ColumnLayoutSectionField are flex columns, so "top"/"bottom"
// push a component to either end via margin-auto, matching the pattern
// already used in ProjectInfoSection ("mb-auto" pins the live-url link up top).
export function selfAlignClass(selfAlign) {
  switch (selfAlign) {
    case "top":
      return "mb-auto";
    case "bottom":
      return "mt-auto";
    case "center":
      return "self-center";
    default:
      return "";
  }
}
