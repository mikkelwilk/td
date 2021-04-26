import { CirclePicker } from "react-color";
import { useState } from "react";
import { db } from "../firebase";
function UpdateAccent(props) {
  const [color, setColor] = useState(props.profile.accent);
  const [colorOptions] = useState([
    "#FF0000",
    "#FBB034",
    "#FFDD00",
    "#C1D82F",
    "#00A4E4",
    "#6A737B",
  ]);
  function updateAccent(color) {
    setColor(color.hex);
    var batch = db.batch();
    var profileRef = db.collection("profiles").doc(props.profile.id);
    batch.update(profileRef, { accent: color.hex });
    batch.commit();
  }
  return (
    <CirclePicker
      color={color}
      colors={colorOptions}
      onChangeComplete={updateAccent}
    />
  );
}
export default UpdateAccent;
