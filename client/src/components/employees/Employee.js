import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import linkedInLogo from "../../images/linkedInLogo.png";
import { FormButton } from "../resusable-components/styledComponents";

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

  showSmallModal = () => {
    this.props.showSmallModal(this.props.employee._id);
  };

  send = (
    <TableButton onClick={this.sendEmailButtonClickHandler}>
      Send Email
    </TableButton>
  );
  add = (
    <TableButton onClick={this.addEmailButtonClickHandler}>
      Add Email
    </TableButton>
  );

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
        <TR key={_id}>
          <TD>{name}</TD>
          <TD>{position}</TD>
          <TD>
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
          </TD>

          {emailsSent > 0 && (
            <TD>
              {response ? (
                <p>✅</p>
              ) : (
                <button onClick={this.showSmallModal}>🚨</button>
              )}
            </TD>
          )}
          {emailsSent === 0 && <TD>Email not sent</TD>}

          <TD>{email ? email : ""}</TD>

          <TD>{emailsSent}</TD>

          <TD>{email ? this.send : this.add}</TD>
        </TR>
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

const TD = styled.td`
  padding: 10px;
  border: none;
`;

const TableButton = styled.button`
  width: 115px;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  border: 0;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
  background-color: rgb(15, 174, 241);
  font-weight: bold;
  color: white;
  transition: all 0.25s ease-in-out;
  :hover {
    box-shadow: 0;
  }
`;

const TR = styled.tr`
  :nth-of-type(odd) {
    background-color: #e7e5e5;
  }
  :nth-of-type(even) {
    background-color: #fff;
  }
`;
