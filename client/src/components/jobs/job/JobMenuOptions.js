import React, { useState } from "react";
import { connect } from "react-redux";

import Modal from "../../layout/Modal";
import UpdateStatus from "./UpdateStatus";
import UpdateProgress from "./UpdateProgress";
import JobNotes from "./JobNotes";
import UpdateJob from "../UpdateJob";
import styled from "styled-components";
import { Menu, Span } from "../../resusable-components/styledComponents";
import { jobDataModal } from "../../../redux/actions/modal";

const JobMenuOptions = ({
  job,
  job: { _id, company, linkedIn, link, website, notes, progress },
  jobDataModal
}) => {
  const [status, setStatus] = useState(false);
  const [stateNotes, setNotes] = useState(false);
  const [stateProgress, setProgress] = useState(false);

  const closeModal = () => {
    setStatus(false);
    setNotes(false);
    setProgress(false);
  };

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
          <p className="nav-link" onClick={() => setStatus(true)}>
            Update Status
          </p>
        </Span>
        <Span>
          <p className="nav-link" onClick={() => setProgress(true)}>
            Progress
          </p>
        </Span>
        <Span>
          <p className="nav-link" onClick={() => setNotes(true)}>
            Notes
          </p>
        </Span>
      </Menu>

      {status && (
        <Modal
          closeModal={closeModal}
          component={<UpdateStatus closeModal={closeModal} _id={_id} />}
          show={status}
        />
      )}
      {stateNotes && (
        <Modal
          closeModal={closeModal}
          component={
            <JobNotes
              _id={_id}
              company={company}
              notes={notes}
              closeModal={closeModal}
            />
          }
          show={stateNotes}
        />
      )}
      {stateProgress && (
        <Modal
          closeModal={closeModal}
          component={
            <UpdateProgress
              closeModal={closeModal}
              _id={_id}
              progress={progress}
            />
          }
          show={stateProgress}
        />
      )}
      {update && (
        <Modal
          closeModal={closeModal}
          component={<UpdateJob job={job} closeModal={closeModal} _id={_id} />}
          show={update}
        />
      )}
    </Container>
  );
};

const mapStateToProps = state => ({ job: state.job.currentJob });

const mapDispatchToProps = dispatch => {
  return {
    jobDataModal: () => dispatch(jobDataModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobMenuOptions);

const Container = styled.div`
  margin-top: 3em;
  width: 100px;
`;
