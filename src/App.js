import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import { auth } from "./firebase";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  const [user, userUpdate] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      userUpdate(user);
    });
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <p>Home</p>
        </Route>
        <Route path="/login">
          <Login userUpdate={userUpdate} />
        </Route>
        <Route path="/settings">
          <Settings user={user} />
        </Route>
        <Route path="/:profileUrl">
          <Profile user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
