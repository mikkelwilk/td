import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import CardList from "./CardList";
import Card from "./Card";
import DownloadVcard from "./DownloadVcard";
import AddCard from "./AddCard";
import { RiSettings4Fill } from "react-icons/ri";
import "../style.css";
function Profile(props) {
  const { profileUrl } = useParams();
  const [profile, profileUpdate] = useState(false);
  const [cards, cardsUpdate] = useState();
  const [platforms, platformsUpdate] = useState();
  // get user profile
  function getProfile() {
    db.collection("profiles")
      .where("customUrl", "==", profileUrl.toLowerCase())
      .limit(1)
      .onSnapshot((query) => {
        if (query.empty) {
        } else {
          query.forEach((doc) => {
            profileUpdate(doc.data());
          });
        }
      });
  }
  function getPlatforms() {
    db.collection("platforms").onSnapshot((query) => {
      const newPlatforms = [];
      query.forEach((platform) => {
        newPlatforms.push({ ...platform.data(), pid: platform.id });
      });
      platformsUpdate(newPlatforms);
    });
  }
  function getCards(uid) {
    db.collection("links")
      .where("uid", "==", uid)
      .onSnapshot((query) => {
        const newCards = [];
        query.forEach((card) => {
          newCards.push({ ...card.data(), id: card.id });
        });
        newCards.sort(function (a, b) {
          return a.index - b.index;
        });
        cardsUpdate(newCards);
      });
  }

  function signOut() {
    auth.signOut();
  }
  useEffect(() => {
    getProfile();
    getPlatforms();
  }, []);
  useEffect(() => {
    if (profile.uid) {
      getCards(profile.uid);
    }
  }, [profile]);
  return (
    <>
      {cards && platforms && profile ? (
        <body>
          <div className="Nav">
            {props.user ? (
              <button onClick={signOut}>LogOut</button>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
            {props.user ? (
              <Link to="/settings">
                <RiSettings4Fill color="#000000" size="1.5em" />
              </Link>
            ) : (
              ""
            )}
          </div>
          {profile && (
            <>
              <img
                src={profile.profilePhoto}
                className="ProfilePhoto"
                style={{
                  border: `5px solid ${profile.accent}`,
                }}
              />
              <h3>{profile.fullName}</h3>
              <p>{profile.bio}</p>
            </>
          )}
          <DownloadVcard profile={profile}>Download Contact</DownloadVcard>
          <CardList cards={cards} cardsUpdate={cardsUpdate}>
            {cards.map((card, index) => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  profile={profile}
                  index={index}
                  platforms={platforms}
                  user={props.user}
                />
              );
            })}
          </CardList>
          <AddCard platforms={platforms} cards={cards} profile={profile} />
        </body>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
export default Profile;
