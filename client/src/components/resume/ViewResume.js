import React, { Component } from "react";
import { connect } from "react-redux";

class ViewResume extends Component {
  render() {
    return (
      <div>
        <p className="nav-link">Click here to view your resume</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resume: state.auth.currentUser.resume
  };
};

export default connect(mapStateToProps)(ViewResume);
