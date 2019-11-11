import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class JobContainer extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return <h1>JobContainer</h1>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(JobContainer);
