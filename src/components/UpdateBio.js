import { db } from "../firebase";
function UpdateBio(props) {
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target["bio"].value) {
      var batch = db.batch();
      var profileRef = db.collection("profiles").doc(props.profile.id);
      batch.update(profileRef, { bio: e.target["bio"].value });
      batch.commit();
    }
  }
  return (
    <>
      <h2>Update Bio</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="bio" defaultValue={props.profile.bio} />
        <button>Save</button>
      </form>
    </>
  );
}
export default UpdateBio;
