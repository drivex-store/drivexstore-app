// File location: src/modules/sanity/queries/PricingPage/TableSectionData.js
import { sanityClient } from "@libs/sanity/client";

// Same link projection shape used by PricingCardsSectionData.js
const linkProjection = `{
  canDownload,
  href,
  modalId,
  openInNewTab,
  text,
  type
}`;

const TABLE_SECTION_QUERY = `*[_type == "tableSection"][0]{
  headline,
  headlineDisplay,
  text,
  "button": button{
    variant,
    theme,
    size,
    "link": link${linkProjection}
  },
  tableTheme,
  highlightTheme,
  // Derived server-side so the client component never has to scan columns itself
  "hasHighlightedColumn": count(columns[highlight == true]) > 0,
  "columns": columns[]{ _key, title, highlight },
  "rows": rows[]{ _key, category, values }
}`;

export async function getTableSectionData() {
  return sanityClient.fetch(TABLE_SECTION_QUERY, {}, { next: { revalidate: 60 } });
}
