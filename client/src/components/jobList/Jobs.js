import React, { useEffect } from "react";
import { connect } from "react-redux";
import { readJobsThunk } from "../../redux/thunks/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import { currentJob } from "../../redux/actions/job";
import JobListContainer from "./JobListContainer";

import styled from "styled-components";
import { Span } from "../resusableComponents/styledComponents";

const Jobs = ({ readJobsThunk, jobDataModal }) => {
  useEffect(() => {
    readJobsThunk();
  });

  return (
    <JobsDiv>
      <Span>
        <Add className="nav-link" onClick={jobDataModal}>
          Add New Job +
        </Add>
      </Span>

      {/*<JobListContainer /!*jobs={this.props.jobs}*!/ />*/}
      <JobListContainer />
    </JobsDiv>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    jobs: state.job.jobs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currentJob: job => dispatch(currentJob(job)),
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId)),
    readJobsThunk: () => dispatch(readJobsThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs);

const Add = styled.p`
  margin-left: 30px;
  width: 111px;
`;

const JobsDiv = styled.div`
  padding: 20px;
`;
