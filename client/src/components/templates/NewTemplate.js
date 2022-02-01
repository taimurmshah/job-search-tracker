import React, { Component } from "react";
import { connect } from "react-redux";
import { newTemplateThunk } from "../../redux/thunks/template";
import {
  FormContainer,
  Input,
  FormButton,
  HeaderContainer,
  TextArea,
} from "../resusableComponents/styledComponents";
import Checkbox from "../resusableComponents/Checkbox";

class NewTemplate extends Component {
  state = {
    name: "",
    subject: "",
    message: "",
    interpolationValues: false,
    withResume: false,
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.newTemplateThunk(this.state);
    this.props.closeModal();
    this.setState({ name: "", subject: "", message: "" });
  };

  interpolationCheckHandler = () => {
    this.setState(
      {
        interpolationValues: !this.state.interpolationValues,
      },
      () => {
        console.log("interpolationValues:", this.state.interpolationValues);
      }
    );
  };

  resumeCheckHandler = () => {
    this.setState({
      withResume: !this.state.withResume,
    });
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
          text="Include custom values?*"
          clickHandler={this.interpolationCheckHandler}
          checked={this.state.interpolationValues}
        />

        {this.props.resume && (
          <Checkbox
            text="Attach Resume?"
            clickHandler={this.resumeCheckHandler}
            checked={this.state.withResume}
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

const mapDispatchToProps = (dispatch) => {
  return {
    newTemplateThunk: (templateObj) => dispatch(newTemplateThunk(templateObj)),
  };
};

const mapStateToProps = (state) => {
  return {
    resume: state.auth.currentUser.resume,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTemplate);
