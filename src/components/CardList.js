import { db } from "../firebase";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function CardList(props) {
  function onDragEnd(result) {
    if (!result.destination) return;
    const newCards = Array.from(props.cards);
    const [reorderedCard] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, reorderedCard);
    var batch = db.batch();
    newCards.forEach((card, index) => {
      card.index = index;
      batch.update(db.collection("links").doc(card.id), { index: card.index });
    });
    props.cardsUpdate(newCards);
    batch.commit();
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="cards">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default CardList;
