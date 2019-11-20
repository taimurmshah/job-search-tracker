import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Logout from "../auth/Logout";

const Navbar = ({ currentUser, isLoggedIn }) => {
  return (
    <Nav>
      {isLoggedIn ? (
        <>
          <Span>
            <Logout />
          </Span>
          <Span>
            <Link to="/dashboard">Home</Link>
          </Span>
        </>
      ) : (
        <>
          <Span>
            <Link to="/login">Log In</Link>
          </Span>
          <Span>
            <Link to="/signup">Sign Up</Link>
          </Span>
        </>
      )}
    </Nav>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 200px;
  background-color: #43996a;
`;

const Span = styled.span`
  padding: 10px;
  margin: 0 5px;
`;
