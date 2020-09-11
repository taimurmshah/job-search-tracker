import React, { useEffect } from "react";
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
import Jobs from "./components/jobs/jobs-list/Jobs";
import Job from "./components/jobs/job/JobContainer";
import CreateJob from "./components/jobs/CreateJob";
import Resume from "./components/resume/ViewResume";

const App = ({ jwtThunk, readJobsThunk }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      jwtThunk(token);
      readJobsThunk();
    }
  });

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
};

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
