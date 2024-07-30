import { DroppableProvided } from "@hello-pangea/dnd";

import { type Card } from "../../../common/types/types";
import { DropZone } from "../styled/drop-zone";
import { Cards } from "./cards";

type Props = {
  dropProvided: DroppableProvided;
  cards: Card[];
  onCardDelete: (cardId: string) => void;
  onCardRename: (cardId: string, name: string) => void;
};

const List = ({ cards, dropProvided, onCardDelete, onCardRename }: Props) => {
  return (
    <div className="list-container">
      <DropZone ref={dropProvided.innerRef}>
        <Cards cards={cards} onCardDelete={onCardDelete} onCardRename={onCardRename}/>
        {dropProvided.placeholder}
      </DropZone>
    </div>
  );
};

export { List };
