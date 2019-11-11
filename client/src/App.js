import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Landing from "./components/landing/Landing";

class App extends Component {
  render() {
    return (
      <div>
        <>
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </>
      </div>
    );
  }
}

export default App;

//need to be able to log in & sign up
