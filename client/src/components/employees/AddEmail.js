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
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
          <button onClick={this.props.closeModal}>Close</button>
          <PossibleEmails />
        </form>
      </div>
    );
  }
}

export default AddEmail;
