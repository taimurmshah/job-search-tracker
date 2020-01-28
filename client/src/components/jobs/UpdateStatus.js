import React from "react";
import { connect } from "react-redux";
import { updateJobThunk } from "../../redux/thunks/job";
import {
  HeaderContainer,
  Span
} from "../resusable-components/styledComponents";
import styled from "styled-components";

const UpdateStatus = ({ _id, closeModal, updateJobThunk }) => {
  const clickHandler = e => {
    console.log(e.target.innerText);
    const update = {
      status: e.target.innerText
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

const mapDispatchToProps = dispatch => {
  return {
    updateJobThunk: (jobId, updates) => dispatch(updateJobThunk(jobId, updates))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateStatus);

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  padding: 10px;
`;
