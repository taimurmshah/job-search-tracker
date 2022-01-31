import React from "react";
import { connect } from "react-redux";
import { updateJobThunk } from "../../redux/thunks/job";
import { closeModal } from "../../redux/actions/modal";
import {
  HeaderContainer,
  Span,
  List,
} from "../resusableComponents/styledComponents";

const Status = ({ _id, closeModal, updateJobThunk }) => {
  const clickHandler = (e) => {
    const update = {
      status: e.target.innerText,
    };
    updateJobThunk(_id, update);
    closeModal();
  };

  return (
    <>
      <HeaderContainer>
        <p>Select status below</p>
      </HeaderContainer>
      <List>
        <Span onClick={clickHandler}>
          <p className="nav-link">Haven't sent email yet</p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">Waiting for email response</p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">
            Submitted application; waiting for company response
          </p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">Recruiter phone call</p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">Phone screen</p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">Code challenge</p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">On-site</p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">Offer</p>
        </Span>
        <Span onClick={clickHandler}>
          <p className="nav-link">Rejected</p>
        </Span>
      </List>
    </>
  );
};

const mapStateToProps = (state) => ({ _id: state.job.currentJob._id });

const mapDispatchToProps = (dispatch) => {
  return {
    updateJobThunk: (jobId, updates) =>
      dispatch(updateJobThunk(jobId, updates)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
