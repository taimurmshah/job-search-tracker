import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
    //todo enter email if not there

    const employees = this.props.employees.map(e => {
      console.log({ e });
      return (
        <li key={e._id}>
          <p>{e.name}</p>
          <p>Position: {e.position}</p>
          <p>LinkedIn: {e.linkedIn}</p>
          <p>{e.email ? "send email" : "add email"}</p>
        </li>
      );
    });

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
