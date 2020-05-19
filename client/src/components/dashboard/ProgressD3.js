import React, { Component } from "react";
import { connect } from "react-redux";

class ProgressD3 extends Component {
  componentDidMount() {
    this.getData();
  }

  state = { progress: {} };

  getData = async () => {
    const token = localStorage.getItem("token");
    try {
      let res = await fetch(`${process.env.REACT_APP_URL}/jobs/d3/progress`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        }
      });
      let data = await res.json();
      this.setState({ progress: data });
    } catch (err) {
      console.log({ err });
    }
  };

  render() {
    console.log("this.state:", this.state);
    return <div />;
  }
}

export default connect()(ProgressD3);

//todo - does the d3 fetch really need to be in any other component than this?
