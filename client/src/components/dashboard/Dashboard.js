import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
class Dashboard extends Component {
  render() {
    const token = localStorage.getItem("token");
    console.log("Dashboard.js");
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/create-job">Add new job</Link>
        <Link to="/jobs">View all jobs</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(Dashboard);
