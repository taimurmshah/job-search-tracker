import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { jwtThunk } from "../../redux/thunks/auth";
import Loading from "./Loading";
import Upload from "../resume/Upload";
import Modal from "./Modal";
import LoginForm from "../auth/LoginForm";

class Dashboard extends Component {
  state = {
    showModal: false
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
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
        <h1>Dashboard</h1>
        {this.state.showModal && (
          <Modal
            component={<Upload closeModal={this.closeModal} />}
            closeModal={this.closeModal}
            show={this.state.showModal}
          />
        )}
        <ul>
          <li>
            <Link className="nav-link" to="/create-job">
              Add new job
            </Link>
          </li>
          {this.props.hasJobs && (
            <li>
              <Link className="nav-link" to="/jobs">
                View all jobs
              </Link>
            </li>
          )}
          <li>
            {this.props.currentUser.resume ? (
              <Link className="nav-link" to="/resume">
                View Resume
              </Link>
            ) : (
              <button className="nav-link" onClick={this.openModal}>
                Add Resume
              </button>
            )}
          </li>
        </ul>
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
    jwtThunk: token => dispatch(jwtThunk(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
