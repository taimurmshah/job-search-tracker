import React from "react";
import { connect } from "react-redux";
import JobCard from "./JobCard";

const RejectedJobs = () => {
  return <div />;
};

const mapStateToProps = state => ({ jobs: state.job.jobs });

export default connect(mapStateToProps)(RejectedJobs);
