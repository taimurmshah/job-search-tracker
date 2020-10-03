import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Menu } from "../resusableComponents/styledComponents";
import {
  editTemplatesModal,
  uploadResumeModal
} from "../../redux/actions/modal";

const DashboardLinks = ({ editTemplatesModal, uploadResumeModal }) => {
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
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    resume: state.auth.currentUser.resume,
    hasJobs: state.job.hasJobs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadResumeModal: () => dispatch(uploadResumeModal()),
    editTemplatesModal: () => dispatch(editTemplatesModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardLinks);

const Span = styled.span`
  padding: 10px;
  margin: 5px;
`;
