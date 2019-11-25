import React, { Component } from "react";
import { connect } from "react-redux";
import { Document } from "react-pdf";

class Resume extends Component {
  render() {
    console.log("props:", this.props);
    return (
      <div>
        <Document file={this.props.resume} />
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
