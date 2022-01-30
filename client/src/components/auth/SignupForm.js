import React, { Component } from "react";
import { connect } from "react-redux";
import { signupThunk } from "../../redux/thunks/auth";
import {
  FormContainer,
  InputContainer,
  Input,
} from "../resusableComponents/styledComponents";

class SignupForm extends Component {
  state = {
    method: "local",
    name: "",
    email: "",
    password: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.closeModal();
    this.props.signupThunk(this.state);
    return this.setState({
      name: "",
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        <p>Sign Up:</p>
        <FormContainer onSubmit={this.submitHandler}>
          <InputContainer>
            <p>Name:</p>
            <Input
              required
              name="name"
              value={this.state.name}
              placeholder="name"
              onChange={this.changeHandler}
            />
            <p>Email:</p>
            <Input
              required
              name="email"
              value={this.state.email}
              placeholder="email"
              onChange={this.changeHandler}
            />
            Password:
            <Input
              required
              type="password"
              name="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.changeHandler}
            />
          </InputContainer>
          <div className="modal-buttons">
            <button type="submit">Register</button>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupThunk: (userObj) => dispatch(signupThunk(userObj)),
  };
};

export default connect(null, mapDispatchToProps)(SignupForm);
