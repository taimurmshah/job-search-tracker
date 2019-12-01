import React, { Component } from "react";
import { connect } from "react-redux";
import { newTemplateThunk } from "../../redux/thunks/template";
import styled from "styled-components";
import { FormContainer, Input } from "../styled-components/styledComponents";

class NewTemplate extends Component {
  state = {
    name: "",
    subject: "",
    message: "",
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

  checkHandler = () => {
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

        {this.props.resume && (
          <CheckBoxSpan>
            <p>Attach resume?</p>
            <CheckBox onClick={this.checkHandler} />
          </CheckBoxSpan>
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

const CheckBoxSpan = styled.span`
  display: flex;
  flex-direction: row;
  margin: 15px;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  margin-left: 5px;
`;
