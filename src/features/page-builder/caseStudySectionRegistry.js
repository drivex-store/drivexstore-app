import { HeroSectionField } from "@views/work/caseStudy/sections/HeroSectionField";
import { ColumnLayoutSectionField } from "@views/work/caseStudy/sections/ColumnLayoutSectionField";
import { GallerySectionField } from "@views/work/caseStudy/sections/GallerySectionField";
import { MediaSectionField } from "@views/work/caseStudy/sections/MediaSectionField";

// Keyed by the pageBuilder.sectionsArray entry's Sanity `_type`.
export const caseStudySectionRegistry = {
  heroSectionField: HeroSectionField,
  columnLayoutSectionField: ColumnLayoutSectionField,
  gallerySectionField: GallerySectionField,
  mediaSectionField: MediaSectionField,
};
