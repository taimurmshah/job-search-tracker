import React from "react";
import { connect } from "react-redux";
import { HeaderContainer } from "../resusableComponents/styledComponents";

const Navbar = () => {
  return <HeaderContainer>"OPTIONS HERE"</HeaderContainer>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
