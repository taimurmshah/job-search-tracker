import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Logout from "../auth/Logout";
import Picture from "react-rounded-image";

const Navbar = ({ currentUser, isLoggedIn, imageUrl }) => {
  return (
    <Nav>
      {isLoggedIn ? (
        <>
          <Span>
            <Logout />
          </Span>
          <Span>
            <Link className="nav-link" to="/dashboard">
              Home
            </Link>
          </Span>
          {imageUrl && (
            <Span>
              <Picture
                image={imageUrl}
                roundedSize="0"
                imageHeight="50"
                imageWidth="50"
              />
            </Span>
          )}
        </>
      ) : (
        <>
          <Span>
            <Link className="nav-link" to="/login">
              Log In
            </Link>
          </Span>
          <Span>
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </Span>
        </>
      )}
    </Nav>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    isLoggedIn: state.auth.isLoggedIn,
    imageUrl: state.auth.currentUser.imageUrl
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
  padding: 5px 200px;
  background-color: #a3bfb7;
`;

const Span = styled.span`
  padding: 10px;
  margin: 0 5px;
  line-height: 52px;
`;
