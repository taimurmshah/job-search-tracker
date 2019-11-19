import React, { Component } from "react";
import PossibleEmails from "./PossibleEmails";

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
        <form className="add-email-form" onSubmit={this.submitHandler}>
          <label>
            Email:
            <input
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
        </form>
        <PossibleEmails />
      </div>
    );
  }
}

export default AddEmail;
