import React, { Component } from "react";
import { connect } from "react-redux";

class Job extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.job.company}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    job: state.jobs.currentJob
  };
};

export default connect(mapStateToProps)(Job);
