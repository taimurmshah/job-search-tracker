import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
class Dashboard extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <Link to="/create-job">Add new job</Link>
          </li>
          <li>
            <Link to="/jobs">View all jobs</Link>
          </li>
        </ul>
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
