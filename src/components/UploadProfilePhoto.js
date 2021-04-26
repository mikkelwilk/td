import FileBase64 from "react-file-base64";
import { db } from "../firebase";

function UploadProfilePhoto(props) {
  function UploadProfilePhoto(string) {
    var batch = db.batch();
    var profileRef = db.collection("profiles").doc(props.profile.id);
    batch.update(profileRef, { profilePhoto: string.base64 });
    batch.commit();
  }
  return <FileBase64 onDone={UploadProfilePhoto.bind(this)} />;
}
export default UploadProfilePhoto;
