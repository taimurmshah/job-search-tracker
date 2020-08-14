import React, { useState } from "react";
import {
  FormContainer,
  InputContainer,
  Input
} from "../resusable-components/styledComponents";

const NewEmployee = ({ closeModal, submitHandler }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [email, setEmail] = useState("");

  const submit = e => {
    e.preventDefault();
    let employee = {
      name: firstName + " " + lastName,
      position,
      linkedIn,
      email
    };
    submitHandler(employee);
  };

  return (
    <div>
      <FormContainer onSubmit={submit}>
        <InputContainer>
          <p>First Name:</p>
          <Input
            type="text"
            name="firstName"
            autoComplete="off"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <p>Last Name:</p>
          <Input
            type="text"
            name="lastName"
            autoComplete="off"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <p>Position:</p>
          <Input
            type="text"
            name="position"
            value={position}
            onChange={e => setPosition(e.target.value)}
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
          <button className="button" onClick={closeModal}>
            Close
          </button>
        </div>
      </FormContainer>
    </div>
  );
};

export default NewEmployee;
