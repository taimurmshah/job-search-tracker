import React, { Component } from "react";
import { connect } from "react-redux";
import NewEmployee from "../employees/NewEmployee";
import Table from "../employees/Table";
import AddEmail from "./AddEmail";
import { updateEmployeeThunk } from "../../redux/thunks/employee";

import { newEmployeeThunk } from "../../redux/thunks/employee";

class Job extends Component {
  state = {
    newEmployeeForm: false,
    addEmailForm: false,
    employeeId: ""
  };

  newEmployeeFormHandler = async () => {
    await this.setState({ newEmployeeForm: !this.state.newEmployeeForm });
  };

  newEmployeeSubmitHandler = employee => {
    this.setState({ newEmployeeForm: !this.state.newEmployeeForm });
    return this.props.newEmployeeThunk(employee, this.props.job._id);
  };

  updateEmployeeSubmitHandler = updates => {
    console.log(
      "In submitHandler. jobId:",
      this.props.job._id,
      "employeeId:",
      this.state.employeeId,
      "updates:",
      updates
    );

    this.props.updateEmployeeThunk(
      this.props.job._id,
      this.state.employeeId,
      updates
    );
    this.setState({
      addEmailForm: false,
      employeeId: ""
    });
  };

  closeEmailFormHandler = async () => {
    await this.setState({ addEmailForm: false, employeeId: "" });
  };

  emailButtonClickHandler = async employeeId => {
    await this.setState({ addEmailForm: true, employeeId });
  };

  render() {
    console.log("rerender");
    return (
      <div>
        <h1>{this.props.job.company}</h1>
        <h2>Employees:</h2>

        {this.props.employees.length > 0 && (
          <Table
            employees={this.props.employees}
            jobId={this.props.job._id}
            emailButtonClickHandler={this.emailButtonClickHandler}
          />
        )}

        <button onClick={this.newEmployeeFormHandler}>Add Employee</button>
        {this.state.newEmployeeForm ? (
          <NewEmployee submitHandler={this.newEmployeeSubmitHandler} />
        ) : null}

        {this.state.addEmailForm && (
          <AddEmail
            closeEmailFormHandler={this.closeEmailFormHandler}
            updateEmployeeSubmitHandler={this.updateEmployeeSubmitHandler}
          />
        )}
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
      dispatch(newEmployeeThunk(employee, jobId)),
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Job);
