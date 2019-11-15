import React, { Component } from "react";
import AddEmail from "../jobs/AddEmail";
import { connect } from "react-redux";
import { updateEmployeeThunk } from "../../redux/thunks/employee";

class Employee extends Component {
  state = {
    addEmail: false
  };

  newEmailSubmit = email => {
    this.setState({ addEmail: false });
    this.props.updateEmployeeThunk(
      this.props.jobId,
      this.props.employee._id,
      email
    );
  };

  render() {
    const { name, position, linkedIn, email } = this.props.employee;

    const send = <button>Send Email</button>;
    const add = (
      <button
        onClick={() => {
          this.setState({ addEmail: !this.state.addEmail });
        }}
      >
        Add Email
      </button>
    );

    return (
      <>
        <li className="employee">
          <p>{name}</p>

          <p>Position: {position} </p>

          <p>LinkedIn: {linkedIn} </p>

          <p>{email ? send : add} </p>

          {this.state.addEmail ? (
            <AddEmail submitHandler={this.newEmailSubmit} />
          ) : null}
        </li>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Employee);
