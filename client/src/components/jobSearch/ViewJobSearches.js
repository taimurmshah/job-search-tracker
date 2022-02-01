import React from "react";
import { connect } from "react-redux";
import JobSearchListItem from "./JobSearchListItem";
import { HeaderContainer } from "../resusableComponents/styledComponents";
import styled from "styled-components";

const ViewJobSearches = ({ jobSearches }) => {
  const allJobSearches = jobSearches.map((js) => {
    return (
      !js.currentSession && (
        <JobSearchListItem id={js._id} key={js._id} jobSearch={js} />
      )
    );
  });

  return (
    <HeaderContainer>
      <JobSearchListContainer>{allJobSearches}</JobSearchListContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    jobSearches: state.jobSearch.jobSearches,
  };
};

export default connect(mapStateToProps)(ViewJobSearches);

const JobSearchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 38vw;
  height: 58vh;
  overflow: scroll;
`;
