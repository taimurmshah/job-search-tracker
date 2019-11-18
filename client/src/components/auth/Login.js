import React, { Component } from "react";
import { connect } from "react-redux";
import { loginThunk } from "../../redux/thunks/auth";
import { Redirect } from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.loginThunk(this.state);
    return this.setState({ email: "", password: "" });
  };

  render() {
    //todo this should be checking if there's a token; if there is, and shit isn't loaded, there should be a
    // loading screen. the loading shit is something i could do like in DevConnector with the redux state.

    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <p>Login:</p>
        <form onSubmit={this.submitHandler}>
          <input
            name="email"
            value={this.state.email}
            placeholder="email"
            onChange={this.changeHandler}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.changeHandler}
          />
          <button type="submit">Login</button>
        </form>
        <GoogleOAuth type="Log in" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginThunk: userObj => dispatch(loginThunk(userObj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
