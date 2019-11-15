import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Employee from "../employees/Employee";
import NewEmployee from "../employees/NewEmployee";

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
    //todo enter email if not there

    const employees = this.props.employees.map(e => (
      <Employee key={e._id} employee={e} jobId={this.props.job._id} />
    ));

    return (
      <div>
        <h1>{this.props.job.company}</h1>
        <h2>Employees:</h2>
        <ul>{employees}</ul>
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
