import React, { Component } from "react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

class Landing extends Component {
  render() {
    return (
      <>
        <Signup />
        <Login />
      </>
    );
  }
}

export default Landing;
