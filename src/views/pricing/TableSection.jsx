// File location: src/modules/views/pricing/TableSection.jsx
import { TableSectionClient } from "@views/components/TableSectionClient";
import { getTableSectionData } from "@libs/sanity/queries/PricingPage/TableSectionData";

export default async function TableSection() {
  const data = await getTableSectionData();

  // Guard clause, same convention as PricingCardsSection.jsx
  if (!data?.columns?.length || !data?.rows?.length) {
    return null;
  }

  return (
    <section
      data-page-builder-section="tableSection"
      data-theme="light"
      className="bg-background pt-64 lg:pt-128 pb-64 lg:pb-128"
    >
      <TableSectionClient
        headline={data.headline}
        headlineDisplay={data.headlineDisplay}
        text={data.text}
        button={data.button}
        columns={data.columns}
        rows={data.rows}
        tableTheme={data.tableTheme}
        highlightTheme={data.highlightTheme}
        hasHighlightedColumn={data.hasHighlightedColumn}
      />
    </section>
  );
}
