import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  FormContainer,
  Input,
  FormButton,
  HeaderContainer,
  TextArea
} from "../resusable-components/styledComponents";
import Checkbox from "../resusable-components/Checkbox";
import { updateTemplateThunk } from "../../redux/thunks/template";

class UpdateTemplate extends Component {
  state = {
    name: this.props.template.name,
    subject: this.props.template.subject,
    message: this.props.template.message,
    interpolationValues: this.props.template.interpolationValues,
    withResume: this.props.template.withResume
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  interpolationCheckHandler = () => {
    this.setState({
      interpolationValues: !this.state.interpolationValues
    });
  };

  resumeCheckHandler = () => {
    this.setState({
      withResume: !this.state.withResume
    });
  };

  submitHandler = () => {
    //todo - check if an update has been made first

    if (this.state === this.props.template) {
      return this.props.closeModal();
    }

    this.props.updateTemplateThunk(this.state, this.props.template._id);
    this.props.closeModal();
  };

  render() {
    return (
      <FormContainer onSubmit={this.submitHandler}>
        <p>Name:</p>
        <Input
          required
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.changeHandler}
        />
        <p>Subject:</p>
        <Input
          required
          type="text"
          name="subject"
          value={this.state.subject}
          onChange={this.changeHandler}
        />
        <p>Message:</p>
        <TextArea
          required
          name="message"
          value={this.state.message}
          onChange={this.changeHandler}
        />

        <Checkbox
          checked={this.state.interpolationValues}
          text="Include custom values?*"
          clickHandler={this.interpolationCheckHandler}
        />

        {this.props.resume && (
          <Checkbox
            checked={this.state.withResume}
            text="Attach Resume?"
            clickHandler={this.resumeCheckHandler}
          />
        )}
        <HeaderContainer>
          <FormButton type="submit">Submit</FormButton>
          <FormButton onClick={this.props.closeModal}>Close</FormButton>
        </HeaderContainer>
      </FormContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    template: state.template.selectedTemplate,
    resume: state.auth.currentUser.resume
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTemplateThunk: (templateObj, templateId) =>
      dispatch(updateTemplateThunk(templateObj, templateId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTemplate);

// const TextArea = styled.textarea`
//   margin-top: 10px;
//   margin-bottom: 0px;
//   height: 150px;
//   width: 400px;
// `;
