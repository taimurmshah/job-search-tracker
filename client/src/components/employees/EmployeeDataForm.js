import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { removeCurrentEmployee } from "../../redux/actions/employee";
import {
  newEmployeeThunk,
  updateEmployeeThunk,
} from "../../redux/thunks/employee";
import { closeModal } from "../../redux/actions/modal";
import {
  FormContainer,
  InputContainer,
  Input,
} from "../resusableComponents/styledComponents";
import CloseFormButton from "../resusableComponents/CloseFormButton";

const EmployeeDataForm = ({
  employee,
  jobId,
  newEmployeeThunk,
  updateEmployeeThunk,
  removeCurrentEmployee,
  closeModal,
}) => {
  useEffect(() => () => removeCurrentEmployee(), []);

  let { name = " ", position = "", linkedIn = "", email = "" } = employee;

  const [stateFirstName, setFirstName] = useState(name.split(" ")[0]);
  const [stateLastName, setLastName] = useState(name.split(" ")[1]);
  const [statePosition, setPosition] = useState(position);
  const [stateLinkedIn, setLinkedIn] = useState(linkedIn);
  const [stateEmail, setEmail] = useState(email);

  const submit = (e) => {
    e.preventDefault();
    const employeeObject = createEmployeeObject();
    if (Object.keys(employee).length === 0) {
      newEmployeeThunk({ employee: employeeObject, jobId });
    } else {
      updateEmployeeThunk({
        jobId,
        employeeId: employee._id,
        updates: employeeObject,
      });
    }
    return closeModal();
  };

  const createEmployeeObject = () => {
    return {
      name: stateFirstName + " " + stateLastName,
      position: statePosition,
      linkedIn: stateLinkedIn,
      email: stateEmail,
    };
  };

  return (
    <FormContainer onSubmit={submit}>
      <InputContainer>
        <p>First Name:</p>
        <Input
          type="text"
          name="stateFirstName"
          autoComplete="off"
          value={stateFirstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <p>Last Name:</p>
        <Input
          type="text"
          name="stateLastName"
          autoComplete="off"
          value={stateLastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <p>Position:</p>
        <Input
          type="text"
          name="statePosition"
          value={statePosition}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <p>LinkedIn Profile:</p>
        <Input
          type="text"
          name="stateLinkedIn"
          autoComplete="off"
          value={stateLinkedIn}
          onChange={(e) => {
            setLinkedIn(e.target.value);
          }}
          required
        />
        <p>Email: (not required)</p>
        <Input
          type="text"
          name="stateEmail"
          autoComplete="off"
          value={stateEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputContainer>
      <div className="modal-buttons">
        <button className="button" type="submit">
          Submit
        </button>
        <CloseFormButton />
      </div>
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    jobId: state.job.currentJob._id,
    employee: state.employee.currentEmployee,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newEmployeeThunk: ({ employee, jobId }) =>
      dispatch(newEmployeeThunk({ employee, jobId })),
    updateEmployeeThunk: ({ jobId, employeeId, updates }) =>
      dispatch(updateEmployeeThunk({ jobId, employeeId, updates })),
    removeCurrentEmployee: () => dispatch(removeCurrentEmployee()),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDataForm);
