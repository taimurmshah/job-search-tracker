import React from "react";
import styled from "styled-components";

const ResumeNavbar = ({ resume, upload, view, edit, deleteResume }) => {
  return (
    <Nav>
      {resume ? (
        <>
          <Span>
            <p className="nav-link" onClick={edit}>
              Edit Resume
            </p>
          </Span>
          <Span>
            <p className="nav-link" onClick={view}>
              View Resume
            </p>
          </Span>
          <Span>
            <p className="nav-link" onClick={deleteResume}>
              Delete Resume
            </p>
          </Span>
        </>
      ) : (
        <Span>
          <p className="nav-link" onClick={upload}>
            Upload Resume
          </p>
        </Span>
      )}
    </Nav>
  );
};

const mapStateToProps = state => {
  return {
    resume: state.auth.currentUser.resume
  };
};

export default ResumeNavbar;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const Span = styled.span`
  padding: 10px;
  margin: 5px;
`;
