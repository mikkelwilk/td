import {
  auth,
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../firebase";
import { useHistory } from "react-router";

function Login(props) {
  let history = useHistory();
  const FacebookLogin = () => {
    auth.signInWithPopup(facebookProvider).then((result) => {
      const user = result.user;
      props.userUpdate(user);
      history.goBack();
    });
  };
  const GoogleLogin = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      const user = result.user;
      props.userUpdate(user);
      history.goBack();
    });
  };
  const TwitterLogin = () => {
    auth.signInWithPopup(twitterProvider).then((result) => {
      const user = result.user;
      props.userUpdate(user);
      history.goBack();
    });
  };

  return (
    <div>
      <button onClick={FacebookLogin}>Facebook</button>
      <button onClick={GoogleLogin}>Google</button>
      <button onClick={TwitterLogin}>Twitter</button>
    </div>
  );
}

export default Login;
