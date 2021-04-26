import { db } from "../firebase";
function UpdateName(props) {
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target["fullName"].value) {
      var batch = db.batch();
      var profileRef = db.collection("profiles").doc(props.profile.id);
      batch.update(profileRef, { fullName: e.target["fullName"].value });
      batch.commit();
    }
  }
  return (
    <>
      <h2>Update Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          defaultValue={props.profile.fullName}
        />
        <button>Save</button>
      </form>
    </>
  );
}
export default UpdateName;
