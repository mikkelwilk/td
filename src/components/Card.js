import { Draggable } from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md";
import "../style.css";
import { isOwner } from "../functions";
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
          className="Card"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            onClick={() =>
              window.open(
                props.platforms.find(({ pid }) => pid === props.card.pid).base +
                  props.card.value,
                "_blank"
              )
            }
          >
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
          {isOwner(props.profile, props.user) && (
            <div {...provided.dragHandleProps}>
              <MdDragHandle size="1.5em" />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
export default Card;
