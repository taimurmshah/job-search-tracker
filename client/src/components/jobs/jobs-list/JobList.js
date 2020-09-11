import React, { Component } from "react";
import { Menu } from "../../resusable-components/styledComponents";
import { connect } from "react-redux";
import { currentJob } from "../../../redux/actions/job";
import { getEmployeesThunk } from "../../../redux/thunks/employee";
import JobCard from "./JobCard";
import Checkbox from "../../resusable-components/Checkbox";

class JobList extends Component {
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

    // return <JobListContainer />;

    return (
      <Menu>
        {!this.state.active && (
          <Checkbox
            text={"Follow Up?"}
            clickHandler={this.followUpHandler}
            checked={this.state.followUp}
            position="flex-end"
          />
        )}
        {!this.state.followUp && (
          <Checkbox
            text={"Active Jobs"}
            clickHandler={this.activeHandler}
            checked={this.state.active}
            position="flex-end"
          />
        )}
        {/*{!this.state.followUp ? jobs : followUpJobs}*/}
        {this.state.active === false && this.state.followUp === false && jobs}
        {this.state.followUp && followUpJobs}
        {this.state.active && activeJobs}
      </Menu>
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
)(JobList);
