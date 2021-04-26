import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { db } from "../firebase";
function ProUpdateAccent(props) {
  const [color, setColor] = useState(props.profile.accent);
  function updateAccent() {
    var batch = db.batch();
    var profileRef = db.collection("profiles").doc(props.profile.id);
    batch.update(profileRef, { accent: color });
    batch.commit();
  }
  return (
    <>
      <HexColorPicker color={color} onChange={setColor} />
      <button onClick={updateAccent}>Save</button>
    </>
  );
}
export default ProUpdateAccent;
