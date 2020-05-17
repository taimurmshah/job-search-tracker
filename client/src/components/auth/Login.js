import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import GoogleOAuth from "./GoogleOAuth";
import Modal from "../layout/Modal";

class Login extends Component {
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
    //todo this should be checking if there's a token; if there is, and shit isn't loaded, there should be a
    // loading screen. the loading shit is something i could do like in DevConnector with the redux state.

    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <div className="auth-buttons">
          {/*<button*/}
          {/*  className="login-page-button local-button"*/}
          {/*  onClick={this.openModal}*/}
          {/*>*/}
          {/*  Log In*/}
          {/*</button>*/}
          <GoogleOAuth type="Log in" />
        </div>
        {this.state.showModal && (
          <Modal
            closeModal={this.closeModal}
            show={this.state.showModal}
            component={<LoginForm closeModal={this.closeModal} />}
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

export default connect(mapStateToProps)(Login);
