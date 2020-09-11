import React from "react";
import {
  Span,
  HeaderContainer
} from "../../resusable-components/styledComponents";
import styled from "styled-components";
const DeleteJob = ({ job, closeModal, submitHandler }) => {
  return (
    <Container>
      <HeaderContainer>
        <p>Are you sure you want to delete {job.company}?</p>
      </HeaderContainer>
      <ButtonContainer>
        <Span>
          <button onClick={submitHandler}>Yes</button>
        </Span>

        <Span>
          <button onClick={closeModal}>No</button>
        </Span>
      </ButtonContainer>
    </Container>
  );
};

export default DeleteJob;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
