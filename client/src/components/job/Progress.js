import React, { useState } from "react";
import { connect } from "react-redux";
import Checkbox from "../resusableComponents/Checkbox";
import { updateJobThunk } from "../../redux/thunks/job";
import {
  HeaderContainer,
  List,
  Span,
  TableButton
} from "../resusableComponents/styledComponents";
import { closeModal } from "../../redux/actions/modal";

const Progress = ({ job, updateJobThunk, closeModal }) => {
  let { _id, progress = [] } = job;

  const [stateProgress, setStateProgress] = useState(progress);

  const checkBoxHandler = e => {
    let text = e.target.nextElementSibling.nextElementSibling.innerText;
    if (e.target.checked) setStateProgress([...stateProgress, text]);
    else {
      const newProg = stateProgress.filter(t => t !== text);
      setStateProgress(newProg);
    }
  };

  const submit = e => {
    e.preventDefault();
    updateJobThunk(_id, { progress: stateProgress });
    closeModal();
  };

  return (
    <>
      <HeaderContainer>
        <p>Update progress below</p>
      </HeaderContainer>
      <List>
        <Span>
          <Checkbox
            text="Applied"
            clickHandler={checkBoxHandler}
            position="flex-start"
            checked={stateProgress.includes("Applied") && true}
          />
        </Span>
        <Span>
          <Checkbox
            text="Recruiter Call"
            clickHandler={checkBoxHandler}
            position="flex-start"
            checked={stateProgress.includes("Recruiter Call")}
          />
        </Span>
        <Span>
          <Checkbox
            text="Code Challenge"
            clickHandler={checkBoxHandler}
            position="flex-start"
            checked={stateProgress.includes("Code Challenge")}
          />
        </Span>
        <Span>
          <Checkbox
            text="Technical Call"
            clickHandler={checkBoxHandler}
            position="flex-start"
            checked={stateProgress.includes("Technical Call")}
          />
        </Span>
        <Span>
          <Checkbox
            text="Onsite"
            clickHandler={checkBoxHandler}
            position="flex-start"
            checked={stateProgress.includes("Onsite")}
          />
        </Span>
        <Span>
          <Checkbox
            text="Offer"
            clickHandler={checkBoxHandler}
            position="flex-start"
            checked={stateProgress.includes("Offer")}
          />
        </Span>
      </List>
      <HeaderContainer>
        <TableButton onClick={submit}>Save</TableButton>
        <Span />
        <TableButton onClick={closeModal}>Close</TableButton>
      </HeaderContainer>
    </>
  );
};

const mapStateToProps = state => ({ job: state.job.currentJob });

const mapDispatchToProps = dispatch => {
  return {
    updateJobThunk: (jobId, updates) =>
      dispatch(updateJobThunk(jobId, updates)),
    closeModal: () => dispatch(closeModal)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Progress);
