import React, { Component } from "react";
import styled from "styled-components";
import { InputContainer, Input } from "../resusableComponents/styledComponents";
import { connect } from "react-redux";
import { newResumeThunk, editResumeThunk } from "../../redux/thunks/resume";

class Upload extends Component {
  state = {
    file: "",
    fileName: "Choose File"
  };

  changeHandler = e => {
    this.setState(
      {
        file: e.target.files[0],
        fileName: e.target.files[0].name
      },
      () => {
        console.log("state:", this.state);
      }
    );
  };

  submitHandler = async e => {
    console.log("submit handler is hit");
    e.preventDefault();

    let formData = new FormData();
    formData.append("resume", this.state.file);

    if (this.props.resume) {
      console.log(
        "in the resume submit handler's if statement, here is this.props.resume:",
        this.props.resume
      );
      this.props.editResumeThunk(formData);
    } else {
      console.log(
        "in the resume submit handler's else statement, here is this.props.resume:",
        this.props.resume
      );
      this.props.newResumeThunk(formData);
    }
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        {/*<div className="upload-btn-wrapper">*/}
        <form onSubmit={this.submitHandler}>
          <InputContainer>
            <Input readOnly type="text" value={this.state.fileName} />

            {this.state.fileName !== "Choose File" ? (
              <Button type="submit" onClick={this.submitHandler}>
                Submit
              </Button>
            ) : (
              /*<Button>Select Resume</Button>*/
              <input type="file" onChange={this.changeHandler} />
            )}

            {/*<input type="submit" value="submit" />*/}
          </InputContainer>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resume: state.auth.currentUser.resume
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newResumeThunk: formData => dispatch(newResumeThunk(formData)),
    editResumeThunk: formData => dispatch(editResumeThunk(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);

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
