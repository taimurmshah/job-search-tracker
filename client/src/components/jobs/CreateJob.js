import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { newJobThunk } from "../../redux/thunks/jobs";

class CreateJob extends Component {
  state = {
    company: "",
    website: "",
    link: "",
    linkedIn: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("submit form");
    const token = localStorage.getItem("token");
    this.props.newJobThunk(this.state, token);
    this.setState({ company: "", website: "", link: "", linkedIn: "" });
    return this.props.history.push("/jobs");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <p>Company Name:</p>
          <input
            type="text"
            name="company"
            value={this.state.company}
            onChange={this.changeHandler}
          />
          <p>Company Website:</p>
          <input
            type="text"
            name="website"
            value={this.state.website}
            onChange={this.changeHandler}
          />
          <p>Link to Job Description:</p>
          <input
            type="text"
            name="link"
            value={this.state.link}
            onChange={this.changeHandler}
          />
          <p>LinkedIn Page:</p>
          <input
            type="text"
            name="linkedIn"
            value={this.state.linkedIn}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newJobThunk: (jobObj, token) => dispatch(newJobThunk(jobObj, token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(CreateJob));
