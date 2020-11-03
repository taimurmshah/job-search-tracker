import React, { Component, useState } from "react";
import styled from "styled-components";
import { InputContainer, Input } from "../resusableComponents/styledComponents";
import { connect } from "react-redux";
import { newResumeThunk, editResumeThunk } from "../../redux/thunks/resume";
import { closeModal } from "../../redux/actions/modal";

const Upload = ({
  resume = null,
  newResumeThunk,
  editResumeThunk,
  closeModal,
}) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("resume", file);
    if (resume) editResumeThunk(formData);
    else newResumeThunk(formData);
    return closeModal();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <InputContainer>
          <Input readOnly type="text" value={fileName} />

          {fileName !== "Choose File" ? (
            <Button type="submit" onClick={submit}>
              Submit
            </Button>
          ) : (
            <input type="file" onChange={changeHandler} />
          )}
        </InputContainer>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    resume: state.auth.currentUser.resume,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newResumeThunk: (formData) => dispatch(newResumeThunk(formData)),
    editResumeThunk: (formData) => dispatch(editResumeThunk(formData)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

const Button = styled.button`
  border: 2px solid black;
  color: black;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Bitter", serif;
  cursor: pointer;
`;
