import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Menu } from "../resusableComponents/styledComponents";
import {
  editTemplatesModal,
  uploadResumeModal,
  jobSearchModal,
} from "../../redux/actions/modal";

const DashboardLinks = ({
  editTemplatesModal,
  uploadResumeModal,
  jobSearchModal,
}) => {
  return (
    <Menu>
      <Span>
        <Link className="nav-link" to="/jobs">
          Jobs
        </Link>
      </Span>
      <Span>
        <p className="nav-link" onClick={uploadResumeModal}>
          Resume
        </p>
      </Span>
      <Span>
        <p className="nav-link" onClick={editTemplatesModal}>
          Templates
        </p>
      </Span>
      <Span>
        <p className="nav-link" onClick={jobSearchModal}>
          Job Searches
        </p>
      </Span>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    resume: state.auth.currentUser.resume,
    hasJobs: state.job.hasJobs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadResumeModal: () => dispatch(uploadResumeModal()),
    editTemplatesModal: () => dispatch(editTemplatesModal()),
    jobSearchModal: () => dispatch(jobSearchModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLinks);

const Span = styled.span`
  padding: 10px;
  margin: 5px;
`;
