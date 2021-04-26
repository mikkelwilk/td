import { Draggable } from "react-beautiful-dnd";
function Card(props) {
  return (
    <Draggable
      key={props.card.id}
      draggableId={props.card.id}
      index={props.index}
      isDragDisabled={!props.user}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() =>
            window.open(
              props.platforms.find(({ pid }) => pid === props.card.pid).base +
                props.card.value,
              "_blank"
            )
          }
        >
          <div>
            <h3>
              {props.platforms.find(({ pid }) => pid === props.card.pid).name}
            </h3>
            <p>
              {props.platforms.find(({ pid }) => pid === props.card.pid)
                .useBase &&
                props.platforms.find(({ pid }) => pid === props.card.pid).base}
              {props.card.value}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
export default Card;
