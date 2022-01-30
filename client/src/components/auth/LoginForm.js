import React, { Component } from "react";
import { connect } from "react-redux";
import { loginThunk } from "../../redux/thunks/auth";
import {
  FormContainer,
  InputContainer,
  Input,
} from "../resusableComponents/styledComponents";

class LoginForm extends Component {
  state = {
    method: "local",
    email: "",
    password: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.closeModal();
    this.props.loginThunk(this.state);
    return this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="loginForm">
        <FormContainer onSubmit={this.submitHandler}>
          <InputContainer>
            <p>Email:</p>
            <Input
              required
              name="email"
              value={this.state.email}
              placeholder="email"
              onChange={this.changeHandler}
            />

            <p>Password:</p>
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
            <button type="submit">Login</button>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginThunk: (userObj) => dispatch(loginThunk(userObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
