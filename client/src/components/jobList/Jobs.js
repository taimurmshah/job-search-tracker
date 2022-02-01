import React, { useEffect } from "react";
import { connect } from "react-redux";
import { readJobsThunk } from "../../redux/thunks/job";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import JobListContainer from "./JobListContainer";
import Modal from "../layout/Modal";
import styled from "styled-components";
import { Span } from "../resusableComponents/styledComponents";
import { jobDataModal } from "../../redux/actions/modal";

const Jobs = ({
  hasJobs,
  readJobsThunk,
  jobDataModal,
  isCurrentJobSearchOnGoing,
}) => {
  useEffect(() => {
    readJobsThunk();
  }, []);

  return (
    <JobsDiv>
      {!isCurrentJobSearchOnGoing && (
        <Span>
          <Add className="nav-link" onClick={jobDataModal}>
            Add New Job +
          </Add>
        </Span>
      )}
      <Modal />
      {hasJobs && <JobListContainer />}
    </JobsDiv>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    hasJobs: state.job.hasJobs,
    isCurrentJobSearchOnGoing: state.jobSearch.activeJobSearch.endDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentJob: (job) => dispatch(currentJob(job)),
    getEmployeesThunk: (jobId) => dispatch(getEmployeesThunk(jobId)),
    jobDataModal: () => dispatch(jobDataModal()),
    readJobsThunk: () => dispatch(readJobsThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);

const Add = styled.p`
  margin-left: 30px;
  width: 111px;
`;

const JobsDiv = styled.div`
  padding: 20px;
`;
