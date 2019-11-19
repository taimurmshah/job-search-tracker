import React, { Component } from "react";
import PossibleEmails from "./PossibleEmails";
import { FormContainer, Input } from "../styled-components/styledComponents";

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
      <div className="add-email-container">
        <FormContainer className="add-email-form" onSubmit={this.submitHandler}>
          <label>
            Email:
            <Input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </label>

          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
        </FormContainer>
        <PossibleEmails />
      </div>
    );
  }
}

export default AddEmail;
