import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";

import { type Card } from "../../common/types/types";
import { CardsList } from "../card-list/card-list";
import { DeleteButton } from "../primitives/delete-button";
import { Splitter } from "../primitives/styled/splitter";
import { Title } from "../primitives/title";
import { Footer } from "./components/footer";
import { Container } from "./styled/container";
import { Header } from "./styled/header";
import React from "react";

type Props = {
  listId: string;
  listName: string;
  cards: Card[];
  index: number;
  onTitleChange: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onCreateCard: (id: string, name: string) => void;
  onCardDelete: (listId: string, cardId: string) => void;
  onCardRename: (listId: string, cardId: string, name: string) => void;
  onCardDescriptionChange: (listId: string, cardId: string, description: string) => void;
  onCardCopy: (listId: string, cardId: string) => void;
};

export const Column = ({
                         listId,
                         listName,
                         cards,
                         index,
                         onTitleChange,
                         onDelete,
                         onCreateCard,
                         onCardDelete,
                         onCardRename,
                         onCardDescriptionChange,
                         onCardCopy
                       }: Props) => {
  return (
    <Draggable draggableId={listId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          className="column-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Header
            className="column-header"
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <Title
              aria-label={listName}
              title={listName}
              onChange={(newTitle) => onTitleChange(listId, newTitle)}
              fontSize="large"
              width={200}
              isBold
            />
            <Splitter/>
            <DeleteButton color="#FFF0" onClick={() => onDelete(listId)}/>
          </Header>
          <CardsList listId={listId} listType="CARD" cards={cards} onCardDelete={onCardDelete}
                     onCardRename={onCardRename}
                     onCardDescriptionChange={(cardId, description) => onCardDescriptionChange(listId, cardId, description)}
                     onCardCopy={(cardId) => onCardCopy(listId, cardId)}
          />
          <Footer onCreateCard={(name) => onCreateCard(listId, name)}/>
        </Container>
      )}
    </Draggable>
  );
};
