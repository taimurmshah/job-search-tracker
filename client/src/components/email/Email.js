import React, { Component } from "react";
import EmailNavbar from "./EmailNavbar";
import SendEmail from "./SendEmail";
import EmailModalTemplateList from "../templates/EmailModalTemplateList";

class Email extends Component {
  state = {
    template: false,
    newEmail: false
  };

  template = () => {
    this.setState({
      template: true,
      newEmail: false
    });
  };

  newEmail = () => {
    this.setState({
      template: false,
      newEmail: true
    });
  };

  render() {
    return (
      <div>
        <EmailNavbar template={this.template} newEmail={this.newEmail} />

        {this.state.newEmail && (
          <SendEmail
            sendEmailSubmitHandler={this.props.sendEmailSubmitHandler}
          />
        )}

        {this.state.template && <EmailModalTemplateList />}
      </div>
    );
  }
}

export default Email;
