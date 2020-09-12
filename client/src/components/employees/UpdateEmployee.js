import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  FormContainer,
  InputContainer,
  Input,
  TableButton
} from "../resusableComponents/styledComponents";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import styled from "styled-components";
import CloseFormButton from "../resusableComponents/CloseFormButton";

const UpdateEmployee = ({
  employee,
  updateEmployeeThunk,
  jobId,
  closeModal
}) => {
  const [firstName, setFirstName] = useState(employee.name.split(" ")[0]);
  const [lastName, setLastName] = useState(employee.name.split(" ")[1]);
  const [position, setPosition] = useState(employee.position);
  const [linkedIn, setLinkedIn] = useState(employee.linkedIn);
  const [email, setEmail] = useState(employee.email);

  const submitHandler = e => {
    e.preventDefault();
    let updatedEmployee = {
      name: firstName + " " + lastName,
      position,
      linkedIn,
      email
    };

    updateEmployeeThunk(jobId, employee._id, updatedEmployee);

    closeModal();
  };

  return (
    <div>
      <FormContainer onSubmit={submitHandler}>
        <InputContainer>
          <p>First Name:</p>
          <Input
            type="text"
            name="firstName"
            autoComplete="off"
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
            }}
            required
          />
          <p>Last Name:</p>
          <Input
            type="text"
            name="lastName"
            autoComplete="off"
            value={lastName}
            onChange={e => {
              setLastName(e.target.value);
            }}
            required
          />
          <p>Position:</p>
          <Input
            type="text"
            name="position"
            value={position}
            onChange={e => {
              setPosition(e.target.value);
            }}
            required
          />
          <p>LinkedIn Profile:</p>
          <Input
            type="text"
            name="linkedIn"
            autoComplete="off"
            value={linkedIn}
            onChange={e => {
              setLinkedIn(e.target.value);
            }}
            required
          />
          <p>Email: (not required)</p>
          <Input
            type="text"
            name="email"
            autoComplete="off"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputContainer>
        <div className="modal-buttons">
          <button className="button" type="submit">
            Submit
          </button>
          <CloseFormButton />
        </div>
      </FormContainer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    jobId: state.job.currentJob._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEmployee);

const DeleteButton = styled(TableButton)`
  background-color: red;
  :hover {
    box-shadow: 0;
    background-color: #edadad;
  }
`;
