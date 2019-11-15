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
    const {
      _id,
      name,
      position,
      linkedIn,
      email,
      response
    } = this.props.employee;

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
        <tr key={_id}>
          <td>{name}</td>
          <td>{position}</td>
          <td>{linkedIn}</td>
          <td>{response ? "✅" : "🚨"}</td>

          <td>{email ? email : ""}</td>
          <td>{email ? send : add}</td>
        </tr>

        {this.state.addEmail ? (
          <AddEmail submitHandler={this.newEmailSubmit} />
        ) : null}
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
