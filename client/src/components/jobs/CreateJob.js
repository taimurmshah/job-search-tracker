import React, { useState } from "react";
import { connect } from "react-redux";

import { newJobThunk } from "../../redux/thunks/job";
import {
  FormContainer,
  Input,
  FormButton
} from "../resusable-components/styledComponents";

const CreateJob = ({ closeModal, newJobThunk }) => {
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [link, setLink] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    closeModal();
    newJobThunk({ company, website, link, linkedIn });
    setCompany("");
    setWebsite("");
    setLink("");
    setLinkedIn("");
  };

  return (
    <div>
      <FormContainer onSubmit={submitHandler}>
        <p>Company Name:</p>
        <Input
          required
          autoComplete="off"
          type="text"
          name="company"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
        <p>LinkedIn Page:</p>
        <Input
          required
          type="text"
          name="linkedIn"
          autoComplete="off"
          value={linkedIn}
          onChange={e => setLinkedIn(e.target.value)}
        />
        <p>Company Website:</p>
        <Input
          required
          type="text"
          name="website"
          autoComplete="off"
          value={website}
          onChange={e => setWebsite(e.target.value)}
        />
        <p>Link to Job Description:</p>
        <Input
          required
          type="text"
          name="link"
          autoComplete="off"
          value={link}
          onChange={e => setLink(e.target.value)}
        />

        <FormButton type="submit">Submit</FormButton>
      </FormContainer>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    newJobThunk: jobObj => dispatch(newJobThunk(jobObj))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateJob);
