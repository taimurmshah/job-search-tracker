import React, { Component } from "react";
import { connect } from "react-redux";

class NewEmployee extends Component {
  state = {
    firstName: "",
    lastName: "",
    position: "",
    linkedIn: "",
    email: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    let employee = {
      name: this.state.firstName + " " + this.state.lastName,
      position: this.state.position,
      linkedIn: this.state.linkedIn,
      email: this.state.email
    };

    this.props.submitHandler(employee);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <p>First Name:</p>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.changeHandler}
          />
          <p>Last Name:</p>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.changeHandler}
          />
          <p>Position:</p>
          <input
            type="text"
            name="position"
            value={this.state.position}
            onChange={this.changeHandler}
          />
          <p>LinkedIn Profile:</p>
          <input
            type="text"
            name="linkedIn"
            value={this.state.linkedIn}
            onChange={this.changeHandler}
          />
          <p>Email: (not required)</p>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // newEmployeeThunk: (employee, token) =>
    //   dispatch(newEmployeeThunk(employee, token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewEmployee);
