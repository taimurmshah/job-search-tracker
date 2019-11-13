import React, { Component } from "react";
import { connect } from "react-redux";
import NewEmployee from "../employees/NewEmployee";
import { newEmployeeThunk } from "../../redux/thunks/employee";

class Job extends Component {
  state = {
    newEmployeeForm: false
  };

  newEmployeeSubmitHandler = employee => {
    console.log({ employee });
    this.setState({ newEmployeeForm: !this.state.newEmployeeForm });
    return this.props.newEmployeeThunk(employee, this.props.job._id);
  };

  render() {
    return (
      <div>
        <h1>{this.props.job.company}</h1>
        <button
          onClick={() => {
            this.setState({ newEmployeeForm: !this.state.newEmployeeForm });
          }}
        >
          Add Employee
        </button>
        {this.state.newEmployeeForm ? (
          <NewEmployee submitHandler={this.newEmployeeSubmitHandler} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    job: state.job.currentJob
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newEmployeeThunk: (employee, jobId) =>
      dispatch(newEmployeeThunk(employee, jobId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Job);
