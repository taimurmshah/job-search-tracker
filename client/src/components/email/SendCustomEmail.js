import React, { useState } from "react";
import { connect } from "react-redux";
import { sendNewGmailThunk } from "../../redux/thunks/email";
import { removeCurrentEmployee } from "../../redux/actions/employee";
import { closeModal } from "../../redux/actions/modal";
import Checkbox from "../resusableComponents/Checkbox";
import {
  FormContainer,
  InputContainer,
  Input,
  FormButton,
  TextArea,
} from "../resusableComponents/styledComponents";

const SendCustomEmail = ({
  employeeId,
  hasResume,
  sendNewGmailThunk,
  closeModal,
}) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [withResume, setWithResume] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    sendNewGmailThunk(employeeId, { subject, message, withResume });
    closeModal();
  };

  return (
    <div className="send-email-container">
      <FormContainer className="send-email-form" onSubmit={submit}>
        <InputContainer>
          <p>Subject:</p>
          <Input
            required
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />

          <p>Message:</p>
          <TextArea
            required
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id=""
            cols="30"
            rows="10"
          />

          {hasResume && (
            <Checkbox
              text="Attach Resume?"
              clickHandler={() => setWithResume(!withResume)}
              checked={withResume}
            />
          )}
        </InputContainer>

        <div className="modal-buttons">
          <FormButton type="submit">Submit</FormButton>
          <FormButton onClick={closeModal}>Close</FormButton>
        </div>
      </FormContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hasResume: state.auth.currentUser.resume,
    employeeId: state.employee.currentEmployee._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendNewGmailThunk: (employeeId, emailObj) =>
      dispatch(sendNewGmailThunk(employeeId, emailObj)),
    removeCurrentEmployee: () => dispatch(removeCurrentEmployee()),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendCustomEmail);
