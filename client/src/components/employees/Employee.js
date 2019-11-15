import React, { Component } from "react";
import AddEmail from "../jobs/AddEmail";
import { connect } from "react-redux";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import linkedInLogo from "../../images/linkedInLogo.png";

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

  clickHandler = () => {
    this.props.emailButtonClickHandler(this.props.employee._id);
  };

  send = <button>Send Email</button>;
  add = <button onClick={this.clickHandler}>Add Email</button>;

  render() {
    const {
      _id,
      name,
      position,
      linkedIn,
      email,
      response
    } = this.props.employee;

    return (
      <>
        <tr key={_id}>
          <td>{name}</td>
          <td>{position}</td>
          <td>
            <a href={linkedIn}>
              <img
                className="linkedIn-logo"
                src={linkedInLogo}
                alt="linkedIn logo"
              />
            </a>
          </td>
          <td>{response ? "✅" : "🚨"}</td>

          <td>{email ? email : ""}</td>
          <td>{email ? this.send : this.add}</td>
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
