import { useState } from "react";
import { db } from "../firebase";
function UpdateAddress(props) {
  const [url, urlUpdate] = useState(props.profile.customUrl);
  function handleChange(e) {
    urlUpdate(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target["address"].value) {
      var batch = db.batch();
      var profileRef = db.collection("profiles").doc(props.profile.id);
      batch.update(profileRef, { customUrl: e.target["address"].value });
      batch.commit();
    }
  }
  return (
    <>
      <h2>Update Address</h2>
      <p>
        {window.location.hostname}/<b>{url}</b>
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="address" value={url} onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
}
export default UpdateAddress;
