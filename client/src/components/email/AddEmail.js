import React, { Component } from "react";
import PossibleEmails from "./PossibleEmails";
import {
  InputContainer,
  Input,
  List
} from "../resusable-components/styledComponents";
import styled from "styled-components";

class AddEmail extends Component {
  state = {
    email: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.updateEmployeeSubmitHandler(this.state);
    this.setState({ email: "" });
  };

  render() {
    return (
      // <div className="add-email-container">
      <>
        <List>
          <Form onSubmit={this.submitHandler}>
            <InputContainer>
              <p>Email:</p>
              <Input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </InputContainer>
            <PossibleEmails />
          </Form>
        </List>
        <div className="modal-buttons">
          <button onClick={this.submitHandler}>Submit</button>
          <button onClick={this.props.closeModal}>Close</button>
        </div>
      </>
      // </div>
    );
  }
}

export default AddEmail;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  margin-left: 50px;
`;
