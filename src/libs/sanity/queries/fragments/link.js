// Shared by every query that projects a `link` or `linkField` object.
// Mirrors the reference site's pattern: store an `internal.link` reference
// PLUS a resolved `href` string, so components (SanityLink, SanityRichText's
// LinkField) can keep reading a plain `link.href` and never need to know
// about references at all -- only the query layer needs updating when a new
// page type is added.
//
// Add a new line here whenever a new top-level page schema is introduced.
export const internalHrefResolver = `select(
  internal.link->_type == "homePage" => "/",
  internal.link->_type == "aboutPage" => "/about",
  internal.link->_type == "pricingPage" => "/pricing",
  internal.link->_type == "contactPage" => "/contact",
  internal.link->_type == "workPage" => "/work",
  internal.link->_type == "project" => "/work/" + internal.link->slug.current,
  internal.link->_type == "legalPage" => "/" + internal.link->slug.current,
  internal.link->_type == "page" => select(
    internal.link->uri.current match "/*" => internal.link->uri.current,
    "/" + internal.link->uri.current
  ),
  href
)`;

// For the flat `link` object (header/footer nav items, buttons).
export const linkProjection = `{
  canDownload,
  "href": select(
    type == "internal" => ${internalHrefResolver},
    href
  ),
  modalId,
  openInNewTab,
  text,
  type
}`;

// For `linkField` markDef annotations inside a portable-text array.
// Use inside a richText field like:
//   richText[]{ ..., markDefs[]{ ..., ${linkFieldMarkDefProjection} } }
export const linkFieldMarkDefProjection = `_type == "linkField" => {
  "href": select(
    type == "internal" => ${internalHrefResolver},
    type == "email" => "mailto:" + email,
    href
  )
}`;
