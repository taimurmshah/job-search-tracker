import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteJobThunk } from "../../redux/thunks/job";
import { closeModal } from "../../redux/actions/modal";
import { Span, HeaderContainer } from "../resusableComponents/styledComponents";
import styled from "styled-components";

const DeleteJob = ({ job, closeModal, deleteJobThunk }) => {
  const history = useHistory();
  const deleteJob = () => {
    deleteJobThunk(job._id);
    closeModal();
    history.push("/dashboard");
  };

  return (
    <Container>
      <HeaderContainer>
        <p>Are you sure you want to delete {job.company}?</p>
      </HeaderContainer>
      <ButtonContainer>
        <Span>
          <button onClick={deleteJob}>Yes</button>
        </Span>
        <Span>
          <button onClick={closeModal}>No</button>
        </Span>
      </ButtonContainer>
    </Container>
  );
};

const mapStateToProps = (state) => ({ job: state.job.currentJob });

const mapDispatchToProps = (dispatch) => {
  return {
    deleteJobThunk: (jobId) => dispatch(deleteJobThunk(jobId)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteJob);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
