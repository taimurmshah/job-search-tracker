import React, { useState } from "react";
import PossibleEmails from "./PossibleEmails";
import {
  InputContainer,
  Input,
  List
} from "../resusable-components/styledComponents";
import styled from "styled-components";

const AddEmail = ({ closeModal, updateEmployeeSubmitHandler }) => {
  const [email, setEmail] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    updateEmployeeSubmitHandler({ email });
    setEmail("");
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
        <button onClick={closeModal}>Close</button>
      </div>
    </>
  );
};

export default AddEmail;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  margin-left: 50px;
`;
