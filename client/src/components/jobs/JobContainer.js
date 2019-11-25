import React, { Component } from "react";
import { connect } from "react-redux";
import NewEmployee from "../employees/NewEmployee";
import Table from "../employees/Table";
import AddEmail from "../employees/AddEmail";
import SendEmail from "../employees/SendEmail";
import Modal from "../layout/Modal";
import Loading from "../layout/Loading";
import { currentJob, removeCurrentJob } from "../../redux/actions/job";
import {
  currentEmployee,
  removeCurrentEmployee,
  removeEmployees
} from "../../redux/actions/employee";

import { getJobByIdThunk } from "../../redux/thunks/job";
import {
  getEmployeesThunk,
  updateEmployeeThunk,
  newEmployeeThunk
} from "../../redux/thunks/employee";
import { sendGmailThunk } from "../../redux/thunks/email";
import Job from "./Job";

//todo:
// - create job description component
// - standardize method names

class JobContainer extends Component {
  state = {
    newEmployeeForm: false,
    addEmailForm: false,
    sendEmailForm: false,
    employeeId: "",
    showModal: false
  };

  componentDidMount() {
    if (
      this.props.employees.length === 0 &&
      Object.keys(this.props.job).length === 0
    ) {
      const jobId = this.props.match.params.id;
      this.props.getJobByIdThunk(jobId);
      this.props.getEmployeesThunk(jobId);
    }
  }

  componentWillUnmount() {
    this.props.removeEmployees();
    this.props.removeCurrentJob();
  }

  newEmployeeFormHandler = () => {
    this.setState({
      newEmployeeForm: !this.state.newEmployeeForm,
      showModal: true
    });
  };

  addEmailButtonClickHandler = employeeId => {
    this.props.currentEmployee(employeeId);
    this.setState({ addEmailForm: true, employeeId, showModal: true });
  };

  sendEmailButtonClickHandler = employeeId => {
    this.props.currentEmployee(employeeId);
    this.setState({ sendEmailForm: true, employeeId, showModal: true });
  };

  newEmployeeSubmitHandler = employee => {
    this.setState({ newEmployeeForm: false, showModal: false });
    return this.props.newEmployeeThunk(employee, this.props.job._id);
  };

  updateEmployeeSubmitHandler = updates => {
    this.props.removeCurrentEmployee();
    this.props.updateEmployeeThunk(
      this.props.job._id,
      this.state.employeeId,
      updates
    );
    this.setState({
      newEmployeeForm: false,
      addEmailForm: false,
      sendEmailForm: false,
      employeeId: "",
      showModal: false
    });
  };

  sendEmailSubmitHandler = emailObj => {
    this.props.removeCurrentEmployee();
    this.props.sendGmailThunk(this.state.employeeId, emailObj);
    this.setState({
      newEmployeeForm: false,
      addEmailForm: false,
      sendEmailForm: false,
      employeeId: "",
      showModal: false
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.props.removeCurrentEmployee();
    this.setState({
      showModal: false,
      addEmailForm: false,
      sendEmailForm: false,
      newEmployeeForm: false,
      employeeId: ""
    });
  };

  componentPassToModal = () => {
    if (
      this.state.newEmployeeForm === true &&
      this.state.addEmailForm === false &&
      this.state.sendEmailForm === false
    ) {
      return (
        <NewEmployee
          submitHandler={this.newEmployeeSubmitHandler}
          closeModal={this.closeModal}
        />
      );
    } else if (
      this.state.newEmployeeForm === false &&
      this.state.addEmailForm === true &&
      this.state.sendEmailForm === false
    ) {
      return (
        <AddEmail
          closeModal={this.closeModal}
          updateEmployeeSubmitHandler={this.updateEmployeeSubmitHandler}
        />
      );
    } else if (
      this.state.newEmployeeForm === false &&
      this.state.addEmailForm === false &&
      this.state.sendEmailForm === true
    ) {
      return (
        <SendEmail
          closeModal={this.closeModal}
          sendEmailSubmitHandler={this.sendEmailSubmitHandler}
        />
      );
    }
  };

  render() {
    console.log("job component, here are the props:", this.props);

    if (
      Object.keys(this.props.job).length === 0 &&
      this.props.employees.length === 0
    ) {
      return <Loading />;
    }

    return (
      <div>
        <Job job={this.props.job} />
        {this.props.employees.length > 0 && (
          <Table
            employees={this.props.employees}
            jobId={this.props.job._id}
            addEmailButtonClickHandler={this.addEmailButtonClickHandler}
            sendEmailButtonClickHandler={this.sendEmailButtonClickHandler}
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
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId)),
    currentJob: jobId => dispatch(currentJob(jobId)),
    getJobByIdThunk: jobId => dispatch(getJobByIdThunk(jobId)),
    newEmployeeThunk: (employee, jobId) =>
      dispatch(newEmployeeThunk(employee, jobId)),
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates)),
    currentEmployee: employeeId => dispatch(currentEmployee(employeeId)),
    removeCurrentEmployee: () => dispatch(removeCurrentEmployee()),
    sendGmailThunk: (employeeId, emailObj) =>
      dispatch(sendGmailThunk(employeeId, emailObj)),
    removeEmployees: () => dispatch(removeEmployees()),
    removeCurrentJob: () => dispatch(removeCurrentJob())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobContainer);
