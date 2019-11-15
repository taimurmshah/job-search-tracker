import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return <h1>Landing</h1>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(Landing);
