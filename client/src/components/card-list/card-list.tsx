import type {DroppableProvided} from "@hello-pangea/dnd";
import {Droppable} from "@hello-pangea/dnd";

import {type Card} from "../../common/types/types";
import {List} from "./components/list";
import {ListWrapper} from "./styled/list-wrapper";
import {ScrollContainer} from "./styled/scroll-container";

type Props = {
  listId: string;
  listType: string;
  cards: Card[];
  onCardDelete: (listId: string, cardId: string) => void;
  onCardRename: (listId: string, cardId: string, name: string) => void;
  onCardDescriptionChange: (carId: string, description: string) => void;
  onCardCopy: (cardId: string) => void;
};

const CardsList = ({listId, listType, cards, onCardDelete, onCardRename, onCardDescriptionChange, onCardCopy}: Props) => {
  return (
    <Droppable droppableId={listId} type={listType}>
      {(dropProvided: DroppableProvided) => (
        <ListWrapper {...dropProvided.droppableProps}>
          <ScrollContainer>
            <List cards={cards} dropProvided={dropProvided}
                  onCardDelete={(cardId: string) => onCardDelete(listId, cardId)}
                  onCardRename={(cardId, name) => onCardRename(listId, cardId, name)}
                  onCardDescriptionChange={onCardDescriptionChange}
                  onCardCopy={onCardCopy}
            />
          </ScrollContainer>
        </ListWrapper>
      )}
    </Droppable>
  );
};

export {CardsList};
