import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Menu, Span } from "../resusable-components/styledComponents";
import { connect } from "react-redux";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";

const JobList = ({ jobs, currentJob, getEmployeesThunk }) => {
  jobs = jobs.map(job => (
    <Span key={job._id}>
      <Link
        className="nav-link"
        onClick={() => {
          currentJob(job._id);
          getEmployeesThunk(job._id);
        }}
        to={`/jobs/${job._id}`}
      >
        {job.company}
      </Link>
    </Span>
  ));

  return (
    <Menu>
      {jobs}
      <Span>
        <Link className="nav-link" to="create-job">
          Add New Job
        </Link>
      </Span>
    </Menu>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    currentJob: job => dispatch(currentJob(job)),
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(JobList);
