import React, { Component } from "react";
import { connect } from "react-redux";

import ResumeNavbar from "./ResumeNavbar";
import Upload from "./Upload";
import ViewResume from "./ViewResume";
import DeleteResume from "./DeleteResume";
// import styled from "styled-components";

class Resume extends Component {
  state = {
    upload: false,
    view: false,
    edit: false,
    deleteResume: false
  };

  upload = () => {
    this.setState({
      upload: true,
      view: false,
      edit: false,
      deleteResume: false
    });
  };

  view = () => {
    this.setState({
      upload: false,
      view: true,
      edit: false,
      deleteResume: false
    });
  };

  edit = () => {
    this.setState({
      upload: false,
      view: false,
      edit: true,
      deleteResume: false
    });
  };

  deleteResume = () => {
    this.setState({
      upload: false,
      view: false,
      edit: false,
      deleteResume: true
    });
  };

  render() {
    return (
      <div>
        <ResumeNavbar
          resume={this.props.resume}
          upload={this.upload}
          view={this.view}
          edit={this.edit}
          deleteResume={this.deleteResume}
        />
        {this.state.upload && <Upload closeModal={this.props.closeModal} />}
        {this.state.edit && <Upload closeModal={this.props.closeModal} />}
        {this.state.view && <ViewResume />}
        {this.state.deleteResume && <DeleteResume />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resume: state.auth.currentUser.resume
  };
};

export default connect(mapStateToProps)(Resume);
