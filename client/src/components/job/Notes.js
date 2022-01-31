import React, { useState } from "react";
import { connect } from "react-redux";
import { updateJobThunk } from "../../redux/thunks/job";
import { closeModal } from "../../redux/actions/modal";
import {
  HeaderContainer,
  InputContainer,
  TableButton,
  Span,
} from "../resusableComponents/styledComponents";
import styled from "styled-components";

const Notes = ({ job, updateJobThunk, closeModal }) => {
  const { _id, company, notes = "" } = job;

  const [stateNotes, setStateNotes] = useState(notes);

  const submit = (e) => {
    e.preventDefault();
    updateJobThunk(_id, { notes: stateNotes });
    closeModal();
  };

  return (
    <div>
      <HeaderContainer>
        <Title>{company} Notes</Title>
      </HeaderContainer>
      <InputContainer>
        <TextArea
          required
          name="notes"
          value={stateNotes}
          onChange={(e) => setStateNotes(e.target.value)}
          id=""
          cols="30"
          rows="20"
        />
      </InputContainer>
      <HeaderContainer>
        <TableButton onClick={submit}>Save</TableButton>
        <Span />
        <TableButton onClick={closeModal}>Close</TableButton>
      </HeaderContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({ job: state.job.currentJob });

const mapDispatchToProps = (dispatch) => {
  return {
    updateJobThunk: (jobId, updates) =>
      dispatch(updateJobThunk(jobId, updates)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

const Title = styled.h3`
  font-size: 25px;
`;

const TextArea = styled.textarea`
  margin: 15px;
`;
