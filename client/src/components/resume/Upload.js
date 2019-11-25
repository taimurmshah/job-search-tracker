import React, { Component } from "react";

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
      <div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="">
            {this.state.fileName}
            <input type="file" onChange={this.changeHandler} />
            <input type="submit" value="submit" />
          </label>
        </form>
      </div>
    );
  }
}

export default Upload;
