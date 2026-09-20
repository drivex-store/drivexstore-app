import { sanityClient } from "@libs/sanity/client";
const PRICING_FAQ_QUERY = `*[_type == "pricingFaqSection"][0]{
  theme,
  pageBuilderSection,
  className,
  content{
    "headline": headline{
      level,
      text
    },
    text,
    allowMultiple,
    "items": items[]{
      _key,
      headline,
      text
    }
  }
}`;

export async function getPricingFaqSectionData() {
  return sanityClient.fetch(PRICING_FAQ_QUERY, {}, { next: { revalidate: 60 } });
}
