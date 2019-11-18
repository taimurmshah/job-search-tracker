import React, { Component } from "react";
import { connect } from "react-redux";
import { signupThunk } from "../../redux/thunks/auth";
import { Redirect } from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.signupThunk(this.state);
    return this.setState({
      name: "",
      email: "",
      password: ""
    });
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <p>Sign Up:</p>
        <form onSubmit={this.submitHandler}>
          <input
            name="name"
            value={this.state.name}
            placeholder="name"
            onChange={this.changeHandler}
          />
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
          <button type="submit">Register</button>
        </form>
        <GoogleOAuth type="Register" />
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
    signupThunk: userObj => dispatch(signupThunk(userObj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
