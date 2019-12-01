import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "../resusable-components/Checkbox";
import {
  FormContainer,
  InputContainer,
  Input
} from "../resusable-components/styledComponents";

class SendEmail extends Component {
  state = {
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

    this.props.sendEmailSubmitHandler(this.state);
    this.setState({ subject: "", message: "" });
  };

  checkHandler = () => {
    this.setState({ withResume: !this.state.withResume }, () => {
      console.log("withResume:", this.state.withResume);
    });
  };

  render() {
    return (
      <div className="send-email-container">
        <FormContainer
          className="send-email-form"
          onSubmit={this.submitHandler}
        >
          <InputContainer>
            <p>Subject:</p>
            <Input
              type="text"
              name="subject"
              value={this.state.subject}
              onChange={this.changeHandler}
            />

            <p>Message:</p>
            <textarea
              name="message"
              value={this.state.message}
              onChange={this.changeHandler}
              id=""
              cols="30"
              rows="10"
            />

            {this.props.hasResume && (
              <Checkbox
                text="Attach Resume?"
                clickHandler={this.checkHandler}
              />
            )}
          </InputContainer>

          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasResume: state.auth.currentUser.resume
  };
};

export default connect(mapStateToProps)(SendEmail);
