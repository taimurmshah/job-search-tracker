import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { newJobSearchThunk } from "../../redux/thunks/jobSearches";
import {
  FormContainer,
  Input,
  FormButton,
  HeaderContainer,
  TextArea,
} from "../resusableComponents/styledComponents";

const NewJobSearch = () => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <h3>new job search here</h3>
    </div>
  );
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewJobSearch);
