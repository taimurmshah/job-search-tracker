import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PossibleEmails from "./PossibleEmails";
import CloseFormButton from "../resusableComponents/CloseFormButton";
import {
  InputContainer,
  Input,
  List
} from "../resusableComponents/styledComponents";
import styled from "styled-components";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import { removeCurrentEmployee } from "../../redux/actions/employee";
import { closeModal } from "../../redux/actions/modal";

const AddEmail = ({
  jobId,
  employeeId,
  updateEmployeeThunk,
  removeCurrentEmployee,
  closeModal
}) => {
  useEffect(() => () => removeCurrentEmployee(), []);

  const [email, setEmail] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    updateEmployeeThunk({ jobId, employeeId, updates: { email } });
    setEmail("");
    return closeModal();
  };

  return (
    <>
      <List>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <p>Email:</p>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </InputContainer>
          <PossibleEmails />
        </Form>
      </List>
      <div className="modal-buttons">
        <button onClick={submitHandler}>Submit</button>
        <CloseFormButton />
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  jobId: state.job.currentJob._id,
  employeeId: state.employee.currentEmployee._id
});

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: ({ jobId, employeeId, updates }) =>
      dispatch(updateEmployeeThunk({ jobId, employeeId, updates })),
    removeCurrentEmployee: () => dispatch(removeCurrentEmployee()),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmail);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  margin-left: 50px;
`;
