import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { jwtThunk } from "./redux/thunks/auth";
import { readJobsThunk } from "./redux/thunks/jobs";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.jwtThunk(token);
      // this.props.readJobsThunk(token);
    }
  }

  render() {
    return (
      <div>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    jwtThunk: token => dispatch(jwtThunk(token)),
    readJobsThunk: token => dispatch(readJobsThunk(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

//need to be able to log in & sign up
