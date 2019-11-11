import React, { Component } from "react";
import { connect } from "react-redux";
import { signupThunk } from "../../redux/thunks/auth";

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
    return (
      <div>
        <p>Sign Up:</p>
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
        <button onClick={this.submitHandler}>Register</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupThunk: userObj => dispatch(signupThunk(userObj))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);
