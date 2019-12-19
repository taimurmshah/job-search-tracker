import React from "react";
import { Link } from "react-router-dom";
import { Menu, Span } from "../resusable-components/styledComponents";
import { connect } from "react-redux";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  jobs = jobs.map(job => (
    <JobCard
      key={job._id}
      _id={job._id}
      company={job.company}
      status={job.status}
    />
  ));

  return <Menu>{jobs}</Menu>;
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
