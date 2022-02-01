import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TableButton } from "../resusableComponents/styledComponents";
import { closeModal } from "../../redux/actions/modal";

const JobSearchListItem = ({ id, jobSearch }) => {
  console.log({ jobSearch });
  return (
    <JobSearchContainer>
      <TitleSpan>
        <p>{jobSearch.title}</p>
      </TitleSpan>
    </JobSearchContainer>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearchListItem);

const JobSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  :nth-of-type(odd) {
    background-color: #e7e5e5;
  }
  :nth-of-type(even) {
    background-color: #fff;
  }
`;

const Span = styled.span`
  padding: 10px;
  margin: 0 5px;
`;

const TitleSpan = styled.span`
  padding: 10px;
  margin: 1vh 5px;
`;
