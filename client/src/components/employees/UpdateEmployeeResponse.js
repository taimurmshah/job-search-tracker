import React, { useState } from "react";
import { connect } from "react-redux";
import { updateJobThunk } from "../../redux/thunks/job";
import { closeModal } from "../../redux/actions/modal";
import styled from "styled-components";
import { Span, HeaderContainer } from "../resusableComponents/styledComponents";

const UpdateEmployeeResponse = ({
  _id,
  closeModal,
  submitHandler,
  updateJobThunk,
  currentEmployee: { name }
}) => {
  const [response, setResponse] = useState(false);

  const close = () => {
    setResponse(false);
    closeModal();
  };

  const submit = e => {
    const update = { status: e.target.innerText };
    submitHandler();
    updateJobThunk(_id, update);
  };

  if (!name) return null;

  return (
    <Container>
      <HeaderContainer>
        <p>Did {name.split(" ")[0]} email you back?</p>
      </HeaderContainer>
      <ButtonContainer>
        <Span>
          <button onClick={() => setResponse(true)}>Yes</button>
        </Span>

        <Span>
          <button onClick={close}>No</button>
        </Span>
      </ButtonContainer>

      {response && (
        <>
          <HeaderContainer>
            <p>Update Status</p>
          </HeaderContainer>
          <Span onClick={submit}>
            <p className="nav-link">
              Submitted application; waiting for company response
            </p>
          </Span>
          <Span onClick={submit}>
            <p className="nav-link">Phone screen</p>
          </Span>
          <Span onClick={submit}>
            <p className="nav-link">Code challenge</p>
          </Span>
          <Span onClick={submit}>
            <p className="nav-link">On-site</p>
          </Span>
          <Span onClick={submit}>
            <p className="nav-link">Offer</p>
          </Span>
          <Span onClick={submit}>
            <p className="nav-link">Rejected</p>
          </Span>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    currentEmployee: state.employee.currentEmployee
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateJobThunk: (jobId, updates) =>
      dispatch(updateJobThunk(jobId, updates)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEmployeeResponse);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
