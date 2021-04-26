import UploadProfilePhoto from "./UploadProfilePhoto";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import ProUpdateAccent from "./ProUpdateAccent";
import UpdateAccent from "./UpdateAccent";
import UpdateName from "./UpdateName";
import UpdateAddress from "./UpdateAddress";
import UpdateBio from "./UpdateBio";

function Settings(props) {
  const [profile, profileUpdate] = useState(null);
  function getProfile() {
    db.collection("profiles")
      .where("uid", "==", props.user.uid)
      .limit(1)
      .onSnapshot((query) => {
        if (query.empty) {
        } else {
          query.forEach((doc) => {
            profileUpdate({ ...doc.data(), id: doc.id });
          });
        }
      });
  }
  useEffect(() => {
    if (props.user) {
      getProfile();
    }
  }, [props.user]);
  return (
    <>
      {profile ? (
        <>
          <UploadProfilePhoto profile={profile} />
          <UpdateAccent profile={profile} />
          <UpdateName profile={profile} />
          <UpdateBio profile={profile} />
          <UpdateAddress profile={profile} />
        </>
      ) : (
        <>
          <p>loading...</p>
        </>
      )}
    </>
  );
}
export default Settings;
