import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { HeaderContainer } from "../resusableComponents/styledComponents";

class Landing extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <HeaderContainer>
        <h1>Job Search Tracker</h1>
      </HeaderContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(Landing);
