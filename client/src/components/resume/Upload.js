import React, { Component } from "react";
import styled from "styled-components";
import { InputContainer, Input } from "../styled-components/styledComponents";

class Upload extends Component {
  state = {
    file: "",
    fileName: "Choose File"
  };

  changeHandler = e => {
    // console.log("e.target.files[0]:", e.target.files[0]);
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
    e.preventDefault();
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("resume", this.state.file);
    this.props.closeModal();
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/users/me/resume`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: token
        },
        body: formData
      });

      const result = await res.json();
      console.log({ result });
    } catch (err) {
      console.log({ err });
    }
  };

  render() {
    return (
      <div className="upload-btn-wrapper">
        <form onSubmit={this.submitHandler}>
          <InputContainer>
            <Input type="text" value={this.state.fileName} />

            {this.state.fileName !== "Choose File" ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button>Upload Resume</Button>
            )}
            <input type="file" onChange={this.changeHandler} />
            {/*<input type="submit" value="submit" />*/}
          </InputContainer>
        </form>
      </div>
    );
  }
}

export default Upload;

const Button = styled.button`
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
`;
