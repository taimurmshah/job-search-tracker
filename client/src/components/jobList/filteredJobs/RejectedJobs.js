import React from "react";
import { connect } from "react-redux";
import JobCard from "../JobCard";

const RejectedJobs = ({ jobs }) => {
  return jobs
    .filter(job => job.status === "Rejected")
    .map(job => (
      <JobCard
        key={job._id}
        _id={job._id}
        company={job.company}
        status={job.status}
        date={job.mostRecentEmailSent}
      />
    ));
};

const mapStateToProps = state => ({ jobs: state.job.jobs });

export default connect(mapStateToProps)(RejectedJobs);
