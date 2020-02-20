import React, { Component } from "react";
import styled from "styled-components";
// import { Menu, Span } from "../resusable-components/styledComponents";
import { connect } from "react-redux";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import JobCard from "./JobCard";
import Checkbox from "../resusable-components/Checkbox";
import Job from "./Job";

class JobListContainer extends Component {
  state = {
    followUp: false,
    active: false
  };

  followUpHandler = () => {
    this.setState({
      followUp: !this.state.followUp,
      active: false
    });
  };

  activeHandler = () => {
    this.setState({
      followUp: false,
      active: !this.state.active
    });
  };

  render() {
    const jobs = this.props.jobs.map(job => (
      <JobCard
        key={job._id}
        _id={job._id}
        company={job.company}
        status={job.status}
        date={job.mostRecentEmailSent}
      />
    ));

    const today = new Date();

    let followUpJobs = this.props.jobs
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

    const activeJobs = this.props.jobs
      .filter(j => j.status !== "Rejected")
      .map(j => (
        <JobCard
          key={j._id}
          _id={j._id}
          company={j.company}
          status={j.status}
          date={j.mostRecentEmailSent}
        />
      ));

    return (
      <Container>
        <Header>
          <TextContainer>
            <p>RECENT JOBS</p>
          </TextContainer>
        </Header>
        <Body>
          <JobGrid>{jobs}</JobGrid>
        </Body>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    currentJob: job => dispatch(currentJob(job)),
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(JobListContainer);

const Container = styled.div`
  width: 90%;
  margin: auto;
  background-color: white;
  // border: 3px black solid;
  height: 100px;
  border-radius: 8px;
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom: 1px solid grey;
`;

const TextContainer = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 10px;
  font-size: 20px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const JobGrid = styled.div`
  margin-left: 10;
  padding-left: 17px;
  padding-top: 15px;
  padding-bottom: 15px
  width: 100%;
  background: white;
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(5, 250px);
  grid-template-rows: auto;
  margin-bottom: 30px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
