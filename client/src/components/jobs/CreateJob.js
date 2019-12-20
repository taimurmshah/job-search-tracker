import React, { Component } from "react";
import { connect } from "react-redux";

import { newJobThunk } from "../../redux/thunks/job";
import {
  FormContainer,
  Input,
  FormButton
} from "../resusable-components/styledComponents";

class CreateJob extends Component {
  state = {
    company: "",
    website: "",
    link: "",
    linkedIn: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.closeModal();
    this.props.newJobThunk(this.state);
    this.setState({ company: "", website: "", link: "", linkedIn: "" });
  };

  render() {
    return (
      <div>
        <FormContainer onSubmit={this.submitHandler}>
          <p>Company Name:</p>
          <Input
            required
            type="text"
            name="company"
            value={this.state.company}
            onChange={this.changeHandler}
          />
          <p>Link to Job Description:</p>
          <Input
            required
            type="text"
            name="link"
            value={this.state.link}
            onChange={this.changeHandler}
          />
          <p>LinkedIn Page:</p>
          <Input
            required
            type="text"
            name="linkedIn"
            value={this.state.linkedIn}
            onChange={this.changeHandler}
          />
          <p>Company Website:</p>
          <Input
            required
            type="text"
            name="website"
            value={this.state.website}
            onChange={this.changeHandler}
          />

          <FormButton type="submit">Submit</FormButton>
        </FormContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newJobThunk: jobObj => dispatch(newJobThunk(jobObj))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateJob);
