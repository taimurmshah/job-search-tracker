import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { jwtThunk } from "../../redux/thunks/auth";
import { readJobsThunk } from "../../redux/thunks/job";
import Loading from "../layout/Loading";
// import Upload from "../resume/Upload"
import Modal from "../layout/Modal";
import DashboardLinks from "./DashboardLinks";
import Resume from "../resume/Resume";
import Templates from "../templates/Templates";
import { HeaderContainer } from "../styled-components/styledComponents";
import { readAllTemplatesThunk } from "../../redux/thunks/template";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.hasJobs) {
      this.props.readJobsThunk();
    }
  }

  state = {
    showModal: false,
    templates: false,
    resume: false
  };

  openResume = () => {
    this.setState({ showModal: true, resume: true });
  };

  openTemplates = () => {
    this.props.readAllTemplatesThunk();
    this.setState({ showModal: true, templates: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, templates: false, resume: false });
  };

  componentToPassToModal = () => {
    if (this.state.resume === true) {
      return (
        <Modal
          component={<Resume closeModal={this.closeModal} />}
          closeModal={this.closeModal}
          show={this.state.showModal}
        />
      );
    } else if (this.state.templates === true) {
      return (
        <Modal
          component={<Templates closeModal={this.closeModal} />}
          closeModal={this.closeModal}
          show={this.state.showModal}
        />
      );
    }
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Loading />;
    }

    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <HeaderContainer>
          <h1>Dashboard</h1>
        </HeaderContainer>
        {this.state.showModal && this.componentToPassToModal()}
        <DashboardLinks
          openResume={this.openResume}
          openTemplates={this.openTemplates}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    hasJobs: state.job.hasJobs,
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    jwtThunk: token => dispatch(jwtThunk(token)),
    readJobsThunk: () => dispatch(readJobsThunk()),
    readAllTemplatesThunk: () => dispatch(readAllTemplatesThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
