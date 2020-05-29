import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
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

  nameClick = e => {
    // const empId = e.target.parentElement.parentElement.dataset.id;
    this.props.openUpdateModal(this.props.employee);
    // console.log({ empId });
  };

  deleteClick = e => {
    this.props.openDeleteModal(this.props.employee);
  };

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
        <TR key={_id} data-id={_id}>
          <TD>
            <HOVER onClick={this.nameClick} role="img" aria-label="siren">
              ✎
            </HOVER>

            {" " + name + " "}
            <HOVER onClick={this.deleteClick} role="img" aria-label="siren">
              ❌
            </HOVER>
          </TD>
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
                <span role="img" aria-label="check">
                  ✅
                </span>
              ) : (
                <NoButton onClick={this.showSmallModal}>
                  <span role="img" aria-label="siren">
                    🚨
                  </span>
                </NoButton>
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

const NoButton = styled.button`
  border: none;
  background: inherit;
`;

const TD = styled.td`
  padding: 10px;
  border: none;
`;

const HOVER = styled.span`
  cursor: pointer;
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
    background-color: rgb(146, 211, 239);
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
