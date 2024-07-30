import type { DraggableLocation } from "@hello-pangea/dnd";

import { type Card, type List } from "../common/types/types";

// Pure functions
const removeItemAtIndex = (index: number, items: any[]): any[] => [
  ...items.slice(0, index),
  ...items.slice(index + 1),
];

const addItemAtIndex = (index: number, item: any, items: any[]): any[] => [
  ...items.slice(0, index),
  item,
  ...items.slice(index),
];

const moveItem = (fromIndex: number, toIndex: number, items: any[]): any[] => {
  const item = items[fromIndex];
  const itemsWithoutItem = removeItemAtIndex(fromIndex, items);
  return addItemAtIndex(toIndex, item, itemsWithoutItem);
};

// Higher-Order Functions
const reorderLists = (startIndex: number, endIndex: number, lists: List[]): List[] =>
  moveItem(startIndex, endIndex, lists);

const reorderCardsInSameList = (sourceIndex: number, destinationIndex: number, cards: Card[]): Card[] =>
  moveItem(sourceIndex, destinationIndex, cards);

const reorderCardsInDifferentLists = (
  sourceList: List,
  sourceIndex: number,
  destinationList: List,
  destinationIndex: number,
  card: Card
): [List, List] => {
  const updatedSourceList = {
    ...sourceList,
    cards: removeItemAtIndex(sourceIndex, sourceList.cards),
  };
  const updatedDestinationList = {
    ...destinationList,
    cards: addItemAtIndex(destinationIndex, card, destinationList.cards),
  };
  return [updatedSourceList, updatedDestinationList];
};

const reorderCards = (
  lists: List[],
  source: DraggableLocation,
  destination: DraggableLocation
): List[] => {
  const sourceList = lists.find(list => list.id === source.droppableId);
  const destinationList = lists.find(list => list.id === destination.droppableId);

  if (!sourceList || !destinationList) {
    throw new Error('Source/Destination list must be not null')
  }

  const card = sourceList.cards[source.index];

  if (source.droppableId === destination.droppableId) {
    const reorderedCards = reorderCardsInSameList(source.index, destination.index, sourceList.cards);
    return lists.map(list =>
      list.id === source.droppableId ? { ...list, cards: reorderedCards } : list
    );
  }

  const [updatedSourceList, updatedDestinationList] = reorderCardsInDifferentLists(
    sourceList,
    source.index,
    destinationList,
    destination.index,
    card
  );

  return lists.map(list => {
    if (list.id === source.droppableId) return updatedSourceList;
    if (list.id === destination.droppableId) return updatedDestinationList;
    return list;
  });
};

export const reorderService = {
  reorderLists,
  reorderCards,
};
