import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";
import Modal from "../layout/Modal";
import SignupForm from "./SignupForm";

class Signup extends Component {
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
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <p>Register:</p>
        <div className="auth-buttons">
          <button
            className="login-page-button local-button"
            onClick={this.openModal}
          >
            Register
          </button>
          <GoogleOAuth type="Register" />
        </div>
        {this.state.showModal && (
          <Modal
            closeModal={this.closeModal}
            show={this.state.showModal}
            component={<SignupForm closeModal={this.closeModal} />}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(Signup);
