import CardsSectionClient from "@views/components/CardsSectionClient";

export function CardsComponent({ cards, fullHeight }) {
  if (!cards?.length) return null;

  return <CardsSectionClient cards={cards} fullHeight={fullHeight} />;
}
