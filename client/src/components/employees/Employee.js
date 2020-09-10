import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { currentEmployee } from "../../redux/actions/employee";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import {
  employeeDataModal,
  addEmailModal,
  deleteEmployeeModal
} from "../../redux/actions/modal";
import linkedInLogo from "../../images/linkedInLogo.png";

const Employee = ({
  employee,
  employeeDataModal,
  addEmailModal,
  currentEmployee,
  deleteEmployeeModal,
  sendEmailButtonClickHandler,
  showSmallModal
}) => {
  let { _id, name, position, linkedIn, email, response, emailsSent } = employee;

  if (emailsSent && typeof emailsSent !== "number") {
    emailsSent = emailsSent.length;
  }

  const updateEmployee = () => {
    currentEmployee(_id);
    employeeDataModal();
  };

  const addEmail = () => {
    currentEmployee(_id);
    addEmailModal();
  };

  const deleteEmployee = () => {
    currentEmployee(_id);

    deleteEmployeeModal();
  };

  return (
    <>
      <TR key={_id} data-id={_id}>
        <TD>
          <HOVER onClick={updateEmployee} role="img" aria-label="siren">
            ✎
          </HOVER>

          {" " + name + " "}
          <HOVER onClick={deleteEmployee} role="img" aria-label="siren">
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
              <NoButton onClick={() => showSmallModal(employee._id)}>
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

        <TD>
          {email ? (
            <TableButton
              onClick={() => sendEmailButtonClickHandler(employee._id)}
            >
              Send Email
            </TableButton>
          ) : (
            <TableButton onClick={addEmail}>Add Email</TableButton>
          )}
        </TD>
      </TR>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: ({ jobId, employeeId, updates }) =>
      dispatch(updateEmployeeThunk({ jobId, employeeId, updates })),
    employeeDataModal: () => dispatch(employeeDataModal()),
    deleteEmployeeModal: () => dispatch(deleteEmployeeModal()),
    addEmailModal: () => dispatch(addEmailModal()),
    currentEmployee: employeeId => dispatch(currentEmployee(employeeId))
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
