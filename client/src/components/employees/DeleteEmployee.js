import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Span,
  HeaderContainer
} from "../resusable-components/styledComponents";
import styled from "styled-components";
import { closeModal } from "../../redux/actions/modal";
import { deleteEmployeeThunk } from "../../redux/thunks/employee";
import { removeCurrentEmployee } from "../../redux/actions/employee";

const DeleteEmployee = ({
  job,
  employee,
  closeModal,
  removeCurrentEmployee,
  deleteEmployeeThunk
}) => {
  console.log("Is this hitting? ");

  useEffect(() => () => removeCurrentEmployee(), []);

  const deleteEmployee = () => {
    deleteEmployeeThunk(job._id, employee._id);
    closeModal();
  };

  return (
    <Container>
      <HeaderContainer>
        <p>Are you sure you want to delete {employee.name}?</p>
      </HeaderContainer>
      <ButtonContainer>
        <Span>
          <button onClick={deleteEmployee}>Yes</button>
        </Span>

        <Span>
          <button onClick={closeModal}>No</button>
        </Span>
      </ButtonContainer>
    </Container>
  );
};

const mapStateToProps = state => ({
  employee: state.employee.currentEmployee,
  job: state.job.currentJob
});

const mapDispatchToProps = dispatch => {
  return {
    deleteEmployeeThunk: (jobId, employeeId) =>
      dispatch(deleteEmployeeThunk(jobId, employeeId)),
    removeCurrentEmployee: () => dispatch(removeCurrentEmployee()),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteEmployee);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
