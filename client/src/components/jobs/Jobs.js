import React, { Component } from "react";
import { connect } from "react-redux";
import { readJobsThunk } from "../../redux/thunks/job";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import Modal from "../layout/Modal";
import JobList from "./JobList";
import JobListContainer from "./JobListContainer";
import CreateJob from "./CreateJob";
import Loading from "../layout/Loading";
import {
  HeaderContainer,
  Span
} from "../resusable-components/styledComponents";
import styled from "styled-components";

class Jobs extends Component {
  componentDidMount() {
    this.props.readJobsThunk();
  }

  state = {
    showModal: false
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    if (this.props.jobs.length === 0) {
      return <Loading />;
    }

    return (
      <div>
        <Span>
          <Add className="nav-link" onClick={this.showModal}>
            Add New Job +
          </Add>
        </Span>

        {this.state.showModal && (
          <Modal
            closeModal={this.closeModal}
            show={this.state.showModal}
            component={<CreateJob closeModal={this.closeModal} />}
          />
        )}

        {/*<JobList jobs={this.props.jobs} />*/}
        <JobListContainer jobs={this.props.jobs} />
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
