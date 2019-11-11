import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Dashboard extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return <h1>Dashboard</h1>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(Dashboard);
