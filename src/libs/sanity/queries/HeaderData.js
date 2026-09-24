import { sanityClient } from "@libs/sanity/client";

const imageProjection = `{
  "_id": asset->_id,
  "_rev": asset->_rev,
  "altText": coalesce(alt, asset->altText),
  "crop": crop,
  "description": asset->description,
  "dimensions": asset->metadata.dimensions,
  "hotspot": hotspot,
  "lqip": asset->metadata.lqip,
  "title": asset->title
}`;

const linkProjection = `{
  canDownload,
  "href": coalesce(
    href,
    select(
      internal.link->_type == "homePage" => "/",
      internal.link->_type == "workPage" => "/work",
      internal.link->_type == "pricingPage" => "/pricing",
      internal.link->_type == "aboutPage" => "/about",
      internal.link->_type == "contactPage" => "/contact",
      internal.link->_type == "project" => "/work/" + internal.link->slug.current,
      internal.link->_type == "page" => "/" + internal.link->slug.current
    )
  ),
  modalId,
  openInNewTab,
  "text": coalesce(customText, text),
  type
}`;

const HEADER_QUERY = `*[_type == "navigation" && navId.current == "nav"][0]{
  "navItems": items[]{
    _key,
    text,
    "link": navigationItemUrl${linkProjection}
  },
  "headerCta": headerCta${linkProjection},
  "flyout": {
    "availability": flyoutAvailability,
    "centerImage": {
      "caption": flyoutCenterImage.caption,
      "image": flyoutCenterImage.image${imageProjection},
      "link": flyoutCenterImage.link${linkProjection}
    },
    "contact": flyoutContact,
    "featuredProject": {
      "caption": flyoutFeaturedProject.caption,
      "project": flyoutFeaturedProject.project->{
        _id,
        title,
        "uri": "/work/" + slug.current,
        "image": image${imageProjection}
      }
    },
    "location": flyoutLocation,
    "socials": flyoutSocials[]{ 
      _key, 
      handle, 
      "href": url, 
      "name": platform 
    },
    "team": flyoutTeam[]{ 
      _key, 
      email, 
      name 
    }
  },
  "spotsRemaining": *[_type == "site"][0].spotsRemaining
}`;

export async function getHeaderData() {
  return sanityClient.fetch(HEADER_QUERY, {}, { next: { revalidate: 60 } });
}
