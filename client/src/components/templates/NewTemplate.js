import React, { Component } from "react";
import { connect } from "react-redux";
import { newTemplateThunk } from "../../redux/thunks/template";
import styled from "styled-components";
import { FormContainer, Input } from "../resusable-components/styledComponents";
import Checkbox from "../resusable-components/Checkbox";

class NewTemplate extends Component {
  state = {
    name: "",
    subject: "",
    message: "",
    interpolationValues: false,
    withResume: false
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("new template submit, need to connect to server and shit.");
    this.props.newTemplateThunk(this.state);
    this.props.closeModal();
    this.setState({ name: "", subject: "", message: "" });
  };

  interpolationCheckHandler = () => {
    this.setState(
      {
        interpolationValues: !this.state.interpolationValues
      },
      () => {
        console.log("interpolationValues:", this.state.interpolationValues);
      }
    );
  };

  resumeCheckHandler = () => {
    this.setState(
      {
        withResume: !this.state.withResume
      },
      () => {
        console.log("this.state.withResume:", this.state.withResume);
      }
    );
  };

  render() {
    return (
      <FormContainer onSubmit={this.submitHandler}>
        <p>Name:</p>
        <Input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.changeHandler}
        />
        <p>Subject:</p>
        <Input
          type="text"
          name="subject"
          value={this.state.subject}
          onChange={this.changeHandler}
        />
        <p>Message:</p>
        <TextArea
          name="message"
          value={this.state.message}
          onChange={this.changeHandler}
        />

        <Checkbox
          text="Include custom values?*"
          clickHandler={this.interpolationCheckHandler}
        />

        {this.props.resume && (
          <Checkbox
            text="Attach Resume?"
            clickHandler={this.resumeCheckHandler}
          />
        )}
        <button type="submit">Submit</button>
      </FormContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newTemplateThunk: templateObj => dispatch(newTemplateThunk(templateObj))
  };
};

const mapStateToProps = state => {
  return {
    resume: state.auth.currentUser.resume
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTemplate);

const TextArea = styled.textarea`
  margin-top: 10px;
  margin-bottom: 0px;
  height: 150px;
  width: 400px;
`;
