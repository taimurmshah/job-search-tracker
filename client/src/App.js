import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { jwtThunk } from "./redux/thunks/auth";
import { readJobsThunk } from "./redux/thunks/job";
import PrivateRoute from "./components/auth/PrivateRoute";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Jobs from "./components/jobs/Jobs";
import Job from "./components/jobs/JobContainer";
import CreateJob from "./components/jobs/CreateJob";
import Resume from "./components/resume/ViewResume";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.jwtThunk(token);

      //todo should i put this here? or should i put it somewhere else? is this expensive?
      this.props.readJobsThunk();
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
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/jobs" component={Jobs} />
            <PrivateRoute exact path="/jobs/:id" component={Job} />
            <PrivateRoute exact path="/create-job" component={CreateJob} />
            <PrivateRoute exact path="/resume" component={Resume} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isLoggedIn: state.auth.isLoggedIn
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    jwtThunk: token => dispatch(jwtThunk(token)),
    readJobsThunk: () => dispatch(readJobsThunk())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);

//need to be able to log in & sign up
