import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    const token = localStorage.getItem("token");

    console.log("Landing.js");

    if (this.props.isLoggedIn) {
      console.log("Landing redirect to dashboard");
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
