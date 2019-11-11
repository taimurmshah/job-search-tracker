import React, { Component } from "react";
import { connect } from "react-redux";
import { loginThunk } from "../../redux/thunks/auth";
import { Redirect } from "react-router-dom";

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
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <p>Login:</p>
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
        <button onClick={this.submitHandler}>Login</button>
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
