// The caseStudy page-builder's own `link` object (schemaTypes/projects/components/link.js)
// uses different field names than the site-wide `link` object (`customText`/`external`
// instead of `text`/`href`), and its internal reference only points at `page` documents.
// This projection normalizes it to the same {text, href, type, modalId, openInNewTab,
// canDownload} shape SanityLink / SanityButton / ButtonGroup already expect, so those
// components can be reused as-is inside case-study sections.
export const caseStudyLinkProjection = `{
  canDownload,
  "href": select(
    type == "external" => external,
    type == "internal" => select(
      defined(internal.link->uri.current) => internal.link->uri.current,
      "/"
    ),
    null
  ),
  modalId,
  openInNewTab,
  "text": customText,
  type
}`;
