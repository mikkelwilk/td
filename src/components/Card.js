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
          <img
            className="CardIcon"
            src={props.platforms.find(({ pid }) => pid === props.card.pid).icon}
          />
          <div
            className="CardContentContainer"
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
            <p className="CardUrl">
              {props.platforms.find(({ pid }) => pid === props.card.pid)
                .useBase &&
                props.platforms
                  .find(({ pid }) => pid === props.card.pid)
                  .base.replace(/(^\w+:|^)\/\//, "")}
              {props.card.value.replace(/(^\w+:|^)\/\//, "")}
            </p>
          </div>
          {isOwner(props.profile, props.user) && (
            <div className="CardDrag" {...provided.dragHandleProps}>
              <MdDragHandle size="2em" />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
export default Card;
