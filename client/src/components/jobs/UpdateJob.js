import React, { Component } from "react";
import { connect } from "react-redux";
import { updateJobThunk } from "../../redux/thunks/job";
import {
  FormContainer,
  Input,
  FormButton
} from "../resusable-components/styledComponents";

class UpdateJob extends Component {
  state = {
    company: this.props.job.company,
    website: this.props.job.website,
    link: this.props.job.link,
    linkedIn: this.props.job.linkedIn
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateHandler = e => {
    e.preventDefault();
    this.props.closeModal();
    this.props.updateJobThunk(this.props.job._id, this.state);
    this.setState({
      company: "",
      website: "",
      link: "",
      linkedIn: ""
    });
  };

  render() {
    return (
      <div>
        <FormContainer onSubmit={this.updateHandler}>
          <p>Company Name:</p>
          <Input
            required
            type="text"
            name="company"
            // // placeHolder={this.props.job.company}
            value={this.state.company}
            onChange={this.changeHandler}
          />
          <p>Link to Job Description:</p>
          <Input
            required
            type="text"
            name="link"
            // // placeHolder={this.props.job.link}
            value={this.state.link}
            onChange={this.changeHandler}
          />
          <p>LinkedIn Page:</p>
          <Input
            required
            type="text"
            name="linkedIn"
            // placeHolder={this.props.job.linkedIn}
            value={this.state.linkedIn}
            onChange={this.changeHandler}
          />
          <p>Company Website:</p>
          <Input
            required
            type="text"
            name="website"
            // placeHolder={this.props.job.website}
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
    updateJobThunk: (jobId, jobObj) => dispatch(updateJobThunk(jobId, jobObj))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateJob);
