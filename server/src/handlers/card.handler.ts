import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
    socket.on(CardEvent.RENAME, this.renameCard.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeDescription.bind(this));
    socket.on(CardEvent.COPY, this.duplicateCard.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "");
    const lists = this.db.getData();

    const updatedLists = lists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();
    this.logger.log('info', `Card created: ${cardName} in list ${listId}`)
  }

  private deleteCard(listId: string, cardId: string): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);
    const updatedCards = list.cards.filter((card) => card.id !== cardId);
    list.setCards(updatedCards);
    this.db.setData(lists);
    this.updateLists();
    this.logger.log('info', `Card deleted: ${cardId} from list ${listId}`);
  }

  private renameCard(listId: string, cardId: string, name: string): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);
    const card = list.cards.find((card) => card.id === cardId);
    card.name = name;
    this.db.setData(lists);
    this.updateLists();
    this.logger.log('info', `Card renamed: ${cardId} in list ${listId} to ${name}`);
  }

  private changeDescription(listId: string, cardId: string, description: string): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);
    const card = list.cards.find((card) => card.id === cardId);
    card.description = description;
    this.db.setData(lists);
    this.updateLists();
    this.logger.log('info', `Card description changed: ${cardId} in list ${listId}`);
  }

  private duplicateCard(listId: string, cardId: string): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);
    const cards = list.cards;
    const card = cards.find((card) => card.id === cardId);
    const clonedCard = card.clone();
    cards.push(clonedCard);
    this.db.setData(lists);
    this.updateLists();
    this.logger.log('info', `Card duplicated: ${cardId} in list ${listId}`);
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
  }
}

export { CardHandler };
