import { useState } from "react";
import { db } from "../firebase";

function AddCard(props) {
  const [selected, selectedUpdate] = useState(props.platforms[0]);
  function handleChange(e) {
    selectedUpdate(props.platforms[e.target.value]);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target["value"].value)
      db.collection("links").add({
        platform: selected.name,
        value: e.target["value"].value,
        uid: props.profile.uid,
        pid: selected.pid,
        index: props.cards.length,
      });
    e.target["value"].value = "";
  }
  return (
    <form onSubmit={handleSubmit}>
      <select value={props.selected} onChange={handleChange}>
        {props.platforms.map((platform, index) => {
          return (
            <option key={platform.id} value={index}>
              {platform.name}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        name="value"
        placeholder={selected.placeholder}
      ></input>
      <button>Add</button>
    </form>
  );
}
export default AddCard;
