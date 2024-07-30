import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";
import React from "react";

import { type Card } from "../../../common/types/types";
import { CardItem } from "../../card-item/card-item";

type Props = {
  cards: Card[];
  onCardDelete: (carId: string) => void;
};

const Cards = ({ cards, onCardDelete }: Props) => (
  <React.Fragment>
    {cards.map((card: Card, index: number) => (
      <Draggable key={card.id} draggableId={card.id} index={index}>
        {(
          dragProvided: DraggableProvided,
          dragSnapshot: DraggableStateSnapshot
        ) => (
          <CardItem
            key={card.id}
            card={card}
            isDragging={dragSnapshot.isDragging}
            provided={dragProvided}
            onDelete={onCardDelete}
          />
        )}
      </Draggable>
    ))}
  </React.Fragment>
);

export { Cards };
