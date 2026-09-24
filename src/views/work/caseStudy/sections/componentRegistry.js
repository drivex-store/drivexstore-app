import { HeadlineComponent } from "../components/HeadlineComponent";
import { TextComponent } from "../components/TextComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { ImageComponent } from "../components/ImageComponent";
import { ListComponent } from "../components/ListComponent";
import { DividerComponent } from "../components/DividerComponent";
import { ButtonGroupComponent } from "../components/ButtonGroupComponent";
import { AccentTextComponent } from "../components/AccentTextComponent";
import { SectionHeaderComponent } from "../components/SectionHeaderComponent";
import { CardsComponent } from "../components/CardsComponent";

// Keyed by the column component's Sanity `_type`.
export const componentRegistry = {
  headlineComponent: HeadlineComponent,
  textComponent: TextComponent,
  buttonComponent: ButtonComponent,
  imageComponent: ImageComponent,
  listComponent: ListComponent,
  dividerComponent: DividerComponent,
  buttonGroupComponent: ButtonGroupComponent,
  accentTextComponent: AccentTextComponent,
  sectionHeaderComponent: SectionHeaderComponent,
  cardsComponent: CardsComponent,
};
