import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";

class Jobs extends Component {
  render() {
    let jobs = this.props.jobs.map(job => (
      <li key={job._id}>
        <Link
          onClick={() => {
            this.props.currentJob(job._id);
            this.props.getEmployeesThunk(job._id);
          }}
          to={`/jobs/${job._id}`}
        >
          {job.company}
        </Link>
      </li>
    ));
    return (
      <div>
        <h1>Jobs</h1>
        <ul>{jobs}</ul>
        <Link to="create-job">Add New Job</Link>
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
