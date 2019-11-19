import React, { Component } from "react";
import { connect } from "react-redux";
import { FormContainer, Input } from "../styled-components/styledComponents";

class SendEmail extends Component {
  state = {
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

    console.log("send email action and thunks here");
    // this.props.closeModal();
    this.props.sendEmailSubmitHandler(this.state);
    this.setState({ subject: "", message: "" });
  };

  render() {
    return (
      <div className="send-email-container">
        <FormContainer
          className="send-email-form"
          onSubmit={this.submitHandler}
        >
          <label htmlFor="">
            Subject:
            <Input
              type="text"
              name="subject"
              value={this.state.subject}
              onChange={this.changeHandler}
            />
          </label>
          <br />
          <label htmlFor="">
            Message:
            <textarea
              name="message"
              value={this.state.message}
              onChange={this.changeHandler}
              id=""
              cols="30"
              rows="10"
            />
            {/*<Input*/}
            {/*  type="text"*/}
            {/*  name="message"*/}
            {/*  value={this.state.message}*/}
            {/*  onChange={this.changeHandler}*/}
            {/*/>*/}
          </label>
          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default connect()(SendEmail);
