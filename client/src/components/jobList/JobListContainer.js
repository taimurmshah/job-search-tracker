import React, { useState } from "react";
import { connect } from "react-redux";

import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import JobCard from "./JobCard";
import Checkbox from "../resusableComponents/Checkbox";
import Loading from "../layout/Loading";
import styled from "styled-components";

const JobListContainer = ({ jobs }) => {
  const [filter, setFilter] = useState("");
  const [followUp, setFollowUp] = useState(false);
  const followUpHandler = () => setFollowUp(!followUp);

  const [rejected, setRejected] = useState(false);
  const rejectedHandler = () => setRejected(!rejected);

  const today = new Date();

  const transformJob = job => (
    <JobCard
      key={job._id}
      _id={job._id}
      company={job.company}
      status={job.status}
      date={job.mostRecentEmailSent}
    />
  );

  const followUpJobs = jobs
    .filter(j => j.mostRecentEmailSent !== null)
    .filter(j => {
      const lastEmail = new Date(j.mostRecentEmailSent);
      const diffTime = Math.abs(today - lastEmail);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 7;
    })
    .filter(
      j =>
        j.status === "Waiting for email response" ||
        j.status === "Submitted application; waiting for company response"
    )
    .map(j => (
      <JobCard
        key={j._id}
        _id={j._id}
        company={j.company}
        status={j.status}
        date={j.mostRecentEmailSent}
      />
    ));

  const activeJobs = jobs
    .filter(j => j.status !== "Rejected")
    .map(j => transformJob(j));

  const rejectedJobs = jobs
    .filter(j => j.status === "Rejected")
    .map(j => transformJob(j));

  if (jobs.length === 0) return <Loading />;

  const testFunc = () => {
    console.log("RETURN TEST FUNC");
  };

  return (
    <Container>
      <Header>
        <TextContainer>
          <P>Recent Jobs</P>

          {rejected === false && followUp === false && (
            <Input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value.toLowerCase())}
            />
          )}

          <CheckFlex>
            <Checkbox
              text={"Follow Up? (" + followUpJobs.length + ")"}
              clickHandler={followUpHandler}
              checked={followUp}
              show={!(rejected || filter.length > 0)}
              position="flex-end"
            />

            <Checkbox
              text={"Rejected Jobs"}
              clickHandler={rejectedHandler}
              checked={rejected}
              show={!(followUp || filter.length > 0)}
              position="flex-end"
            />
          </CheckFlex>
        </TextContainer>
      </Header>
      <JobGrid>
        {rejected === false &&
          followUp === false &&
          filter.length === 0 &&
          activeJobs}
        {rejected === false &&
          followUp === false &&
          filter.length > 0 &&
          jobs
            .filter(j => j.company.toLowerCase().startsWith(filter))
            .map(j => transformJob(j))}
        {rejected && rejectedJobs}
        {followUp && followUpJobs}
      </JobGrid>
    </Container>
  );
};

const mapStateToProps = state => ({ jobs: state.job.jobs });

const mapDispatchToProps = dispatch => {
  return {
    currentJob: job => dispatch(currentJob(job)),
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobListContainer);

const Container = styled.div`
  max-width: 1170px;
  width: auto;
  margin: auto;
  background-color: white;
  height: 100px;
  border-radius: 8px;
  // box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75);
`;

const Header = styled.div`
  height: 70px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom: 1px solid grey;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 10px;
  font-size: 20px;
  justify-content: space-between;
`;

const JobGrid = styled.div`
  padding: 20px;
  max-width: 1200px;
  background: white;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: 30px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  // box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75);
`;

const CheckFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  padding-top: 16px;
`;

const Input = styled.input``;
