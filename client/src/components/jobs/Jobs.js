import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import JobList from "./JobList";
import Loading from "../layout/Loading";

import { HeaderContainer, Menu } from "../styled-components/styledComponents";

class Jobs extends Component {
  render() {
    if (this.props.jobs.length === 0) {
      return <Loading />;
    }

    return (
      <div>
        <HeaderContainer>
          <h1>Jobs</h1>
        </HeaderContainer>
        <JobList jobs={this.props.jobs} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    jobs: state.job.jobs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currentJob: job => dispatch(currentJob(job)),
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs);
