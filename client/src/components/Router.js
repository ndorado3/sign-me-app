import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import RegisterUser from "./Register";
import UpdateUserInfo from "./Update";
import LogIn from "./LogIn";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          {/* Define routes to render different page components at different paths */}
          <Switch>
            <Route exact path="/">
              <RegisterUser />
            </Route>
            <Route exact path="/log-in">
              <LogIn />
            </Route>
            <Route exact path="/update-account">
              <UpdateUserInfo />
            </Route>
            <Route path="*">
              <RegisterUser />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
