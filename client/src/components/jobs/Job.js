import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Employee from "../employees/Employee";
import NewEmployee from "../employees/NewEmployee";
import Table from "../employees/Table";
import AddEmail from "./AddEmail";

import { newEmployeeThunk } from "../../redux/thunks/employee";

class Job extends Component {
  state = {
    newEmployeeForm: false
  };

  newEmployeeSubmitHandler = employee => {
    this.setState({ newEmployeeForm: !this.state.newEmployeeForm });
    return this.props.newEmployeeThunk(employee, this.props.job._id);
  };

  render() {
    return (
      <div>
        <h1>{this.props.job.company}</h1>
        <h2>Employees:</h2>

        {this.props.employees.length > 0 && (
          <Table employees={this.props.employees} jobId={this.props.job._id} />
        )}

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
    job: state.job.currentJob,
    employees: state.employee.employees
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
