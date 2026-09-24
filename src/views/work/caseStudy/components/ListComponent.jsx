import { List } from "@animations/components/List";

export function ListComponent({ animated, pushEffect, items }) {
  if (!items?.length) return null;

  return <List items={items} animated={animated} pushEffect={pushEffect} />;
}
