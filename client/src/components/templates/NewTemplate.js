import React, { Component } from "react";
import styled from "styled-components";
import { FormContainer, Input } from "../styled-components/styledComponents";

class NewTemplate extends Component {
  state = {
    name: "",
    subject: "",
    message: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("new template submit, need to connect to server and shit.");
    this.props.closeModal();
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
        <button type="submit">Submit</button>
      </FormContainer>
    );
  }
}

export default NewTemplate;

const TextArea = styled.textarea`
  margin-top: 10px;
  margin-bottom: 0px;
  height: 150px;
  width: 400px;
`;
