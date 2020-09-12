import React, { useState } from "react";
import { connect } from "react-redux";
import { newJobThunk, updateJobThunk } from "../../redux/thunks/job";
import { closeModal } from "../../redux/actions/modal";

import {
  FormContainer,
  Input,
  FormButton
} from "../resusableComponents/styledComponents";

const JobDataForm = ({ job, newJobThunk, updateJobThunk, closeModal }) => {
  const { company = "", website = "", linkedIn = "", link = "" } = job;

  const [companyState, setCompany] = useState(company);
  const [websiteState, setWebsite] = useState(website);
  const [jobLinkState, setJobLink] = useState(link);
  const [linkedInState, setLinkedIn] = useState(linkedIn);

  const submit = e => {
    e.preventDefault();
    const jobObj = {
      company: companyState,
      website: websiteState,
      link: jobLinkState,
      linkedIn: linkedInState
    };
    if (Object.keys(job).length === 0) {
      newJobThunk(jobObj);
    } else {
      updateJobThunk(job._id, jobObj);
    }
    return closeModal();
  };

  return (
    <FormContainer onSubmit={submit}>
      <p>Company Name:</p>
      <Input
        required
        autoComplete="off"
        type="text"
        name="company"
        value={companyState}
        onChange={e => setCompany(e.target.value)}
      />
      <p>LinkedIn Page:</p>
      <Input
        required
        type="text"
        name="linkedIn"
        autoComplete="off"
        value={linkedInState}
        onChange={e => setLinkedIn(e.target.value)}
      />
      <p>Company Website:</p>
      <Input
        required
        type="text"
        name="website"
        autoComplete="off"
        value={websiteState}
        onChange={e => setWebsite(e.target.value)}
      />
      <p>Link to Job Description:</p>
      <Input
        required
        type="text"
        name="link"
        autoComplete="off"
        value={jobLinkState}
        onChange={e => setJobLink(e.target.value)}
      />
      <FormButton type="submit">Submit</FormButton>
    </FormContainer>
  );
};

const mapStateToProps = state => ({ job: state.job.currentJob });

const mapDispatchToProps = dispatch => {
  return {
    newJobThunk: jobObj => dispatch(newJobThunk(jobObj)),
    updateJobThunk: (jobId, updates) =>
      dispatch(updateJobThunk(jobId, updates)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDataForm);
