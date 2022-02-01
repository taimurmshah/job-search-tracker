import React from "react";
import { connect } from "react-redux";
import {
  jobDataModal,
  jobStatusModal,
  jobNotesModal,
  jobProgressModal,
} from "../../redux/actions/modal";

import styled from "styled-components";
import { Menu, Span } from "../resusableComponents/styledComponents";

const MenuOptions = ({
  job,
  jobDataModal,
  jobStatusModal,
  jobProgressModal,
  jobNotesModal,
}) => {
  let { linkedIn, link, website } = job;

  const update = () => {
    jobDataModal();
  };

  website = "https://" + website;

  link = link && link.startsWith("http") ? link : "https://" + link;

  return (
    <Container>
      <Menu>
        <Span>
          <p className="nav-link" onClick={update}>
            Update
          </p>
        </Span>
        <Span>
          <a
            className="nav-link"
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </Span>
        <Span>
          {/* todo standardize this on backend*/}
          <a
            className="nav-link"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </Span>
        <Span>
          <a
            className="nav-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Job Description
          </a>
        </Span>
        <Span>
          <p className="nav-link" onClick={jobStatusModal}>
            Update Status
          </p>
        </Span>
        <Span>
          <p className="nav-link" onClick={jobProgressModal}>
            Progress
          </p>
        </Span>
        <Span>
          <p className="nav-link" onClick={jobNotesModal}>
            Notes
          </p>
        </Span>
      </Menu>
    </Container>
  );
};

const mapStateToProps = (state) => ({ job: state.job.currentJob });

const mapDispatchToProps = (dispatch) => {
  return {
    jobDataModal: () => dispatch(jobDataModal()),
    jobStatusModal: () => dispatch(jobStatusModal()),
    jobProgressModal: () => dispatch(jobProgressModal()),
    jobNotesModal: () => dispatch(jobNotesModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuOptions);

const Container = styled.div`
  margin-top: 3em;
  width: 100px;
`;
