import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { jwtThunk } from "./redux/thunks/auth";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      return this.props.jwtThunk(token);
    }
  }

  render() {
    return (
      <div>
        <>
          <Navbar />
          <Switch>{/*<Route exact path="/" component={Landing} />*/}</Switch>
        </>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    jwtThunk: token => dispatch(jwtThunk(token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);

//need to be able to log in & sign up
