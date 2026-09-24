import CardsSectionClient from "@views/components/CardsSectionClient";

export function CardsComponent({ cards }) {
  if (!cards?.length) return null;

  return <CardsSectionClient cards={cards} />;
}
