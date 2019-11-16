import React, { Component } from "react";
import { connect } from "react-redux";
import NewEmployee from "../employees/NewEmployee";
import Table from "../employees/Table";
import AddEmail from "./AddEmail";
import Modal from "../layout/Modal";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import { newEmployeeThunk } from "../../redux/thunks/employee";

class Job extends Component {
  state = {
    newEmployeeForm: false,
    addEmailForm: false,
    employeeId: "",
    showModal: false
  };

  newEmployeeFormHandler = async () => {
    await this.setState({
      newEmployeeForm: !this.state.newEmployeeForm,
      showModal: true
    });
  };

  newEmployeeSubmitHandler = employee => {
    this.setState({ newEmployeeForm: false, showModal: false });
    return this.props.newEmployeeThunk(employee, this.props.job._id);
  };

  updateEmployeeSubmitHandler = updates => {
    this.props.updateEmployeeThunk(
      this.props.job._id,
      this.state.employeeId,
      updates
    );
    this.setState({
      addEmailForm: false,
      employeeId: "",
      showModal: false
    });
  };

  closeEmailFormHandler = async () => {
    await this.setState({
      addEmailForm: false,
      employeeId: "",
      showModal: false
    });
  };

  emailButtonClickHandler = async employeeId => {
    await this.setState({ addEmailForm: true, employeeId, showModal: true });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      addEmailForm: false,
      newEmployeeForm: false
    });
  };

  componentPassToModal = () => {
    if (
      this.state.newEmployeeForm === true &&
      this.state.addEmailForm === false
    ) {
      return <NewEmployee submitHandler={this.newEmployeeSubmitHandler} />;
    } else if (
      this.state.newEmployeeForm === false &&
      this.state.addEmailForm === true
    ) {
      return (
        <AddEmail
          closeEmailFormHandler={this.closeEmailFormHandler}
          updateEmployeeSubmitHandler={this.updateEmployeeSubmitHandler}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.props.job.company}</h1>
        <ul className="job-links">
          <li>
            <a href={this.props.job.linkedIn}>LinkedIn</a>
          </li>
          <li>
            <a href={"https://" + this.props.job.website}>Website</a>
          </li>
          <li>
            <a href={this.props.job.link}>Job Description</a>
          </li>
        </ul>
        {this.props.employees.length > 0 && (
          <Table
            employees={this.props.employees}
            jobId={this.props.job._id}
            emailButtonClickHandler={this.emailButtonClickHandler}
          />
        )}

        <div className="add-employee-button">
          <button onClick={this.newEmployeeFormHandler}>Add Employee</button>
        </div>

        <Modal
          closeModal={this.closeModal}
          show={this.state.showModal}
          component={this.componentPassToModal()}
        />
        {/*{this.state.newEmployeeForm && (*/}
        {/*  <NewEmployee submitHandler={this.newEmployeeSubmitHandler} />*/}
        {/*)}*/}
        {/*{this.state.addEmailForm && (*/}
        {/*  <AddEmail*/}
        {/*    closeEmailFormHandler={this.closeEmailFormHandler}*/}
        {/*    updateEmployeeSubmitHandler={this.updateEmployeeSubmitHandler}*/}
        {/*  />*/}
        {/*)}*/}
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
