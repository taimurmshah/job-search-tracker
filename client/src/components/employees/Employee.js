import React, { Component } from "react";
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

  addEmailButtonClickHandler = () => {
    this.props.addEmailButtonClickHandler(this.props.employee._id);
  };

  sendEmailButtonClickHandler = () => {
    this.props.sendEmailButtonClickHandler(this.props.employee._id);
  };

  send = <button onClick={this.sendEmailButtonClickHandler}>Send Email</button>;
  add = <button onClick={this.addEmailButtonClickHandler}>Add Email</button>;

  render() {
    let {
      _id,
      name,
      position,
      linkedIn,
      email,
      response,
      emailsSent
    } = this.props.employee;

    if (typeof emailsSent !== "number") {
      emailsSent = emailsSent.length;
    }
    return (
      <>
        <tr key={_id}>
          <td>{name}</td>
          <td>{position}</td>
          <td>
            <a
              href={linkedIn[0] === "h" ? linkedIn : "https://" + linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="linkedIn-logo"
                src={linkedInLogo}
                alt="linkedIn logo"
              />
            </a>
          </td>

          {emailsSent > 0 && <td>{response ? "✅" : "🚨"}</td>}
          {emailsSent === 0 && <td>Email not sent</td>}

          <td>{email ? email : ""}</td>

          <td>{emailsSent}</td>

          <td>{email ? this.send : this.add}</td>
        </tr>
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
