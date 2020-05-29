import React from "react";
import {
  Span,
  HeaderContainer
} from "../resusable-components/styledComponents";
import styled from "styled-components";
const DeleteEmployee = ({ employee, closeModal, deleteHandler }) => {
  console.log("I am open");
  return (
    <Container>
      <HeaderContainer>
        <p>Are you sure you want to delete {employee.name}?</p>
      </HeaderContainer>
      <ButtonContainer>
        <Span>
          <button onClick={deleteHandler}>Yes</button>
        </Span>

        <Span>
          <button onClick={closeModal}>No</button>
        </Span>
      </ButtonContainer>
    </Container>
  );
};

export default DeleteEmployee;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
