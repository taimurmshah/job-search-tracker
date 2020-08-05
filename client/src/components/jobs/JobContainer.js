import React, { Component } from "react";
import { connect } from "react-redux";
import NewEmployee from "../employees/NewEmployee";
import Table from "../employees/Table";
import AddEmail from "../email/AddEmail";
import Email from "../email/Email";
import Modal from "../layout/Modal";
import SmallModal from "../layout/SmallModal";
import UpdateResponse from "../employees/UpdateResponse";
import Loading from "../layout/Loading";
import Job from "./Job";
import { currentJob, removeCurrentJob } from "../../redux/actions/job";
import {
  currentEmployee,
  removeCurrentEmployee,
  removeEmployees
} from "../../redux/actions/employee";

import { getJobByIdThunk, deleteJobThunk } from "../../redux/thunks/job";
import {
  getEmployeesThunk,
  updateEmployeeThunk,
  newEmployeeThunk
} from "../../redux/thunks/employee";
import { sendNewGmailThunk } from "../../redux/thunks/email";
import { readAllTemplatesThunk } from "../../redux/thunks/template";
import styled from "styled-components";
import {
  HeaderContainer,
  TableButton
} from "../resusable-components/styledComponents";
import DeleteJob from "./DeleteJob";

//todo:
// - create job description component
// - standardize method names

class JobContainer extends Component {
  state = {
    newEmployeeForm: false,
    addEmailForm: false,
    sendEmailForm: false,
    employeeId: "",
    showModal: false,
    responseModal: false,
    deleteModal: false
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

    if (this.props.templates.length === 0) {
      this.props.readAllTemplatesThunk();
    }

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
    this.props.sendNewGmailThunk(this.state.employeeId, emailObj);
    this.setState({
      newEmployeeForm: false,
      addEmailForm: false,
      sendEmailForm: false,
      employeeId: "",
      showModal: false
    });
  };

  closeModal = () => {
    this.props.removeCurrentEmployee();
    this.setState({
      showModal: false,
      addEmailForm: false,
      sendEmailForm: false,
      newEmployeeForm: false,
      employeeId: "",
      responseModal: false,
      deleteModal: false
    });
  };

  showResponseModal = employeeId => {
    this.props.currentEmployee(employeeId);
    this.setState({ responseModal: true }, () => {
      console.log("state:", this.state);
    });
  };

  responseSubmitHandler = () => {
    this.props.updateEmployeeThunk(
      this.props.job._id,
      this.props.currentEmployeeId,
      { response: true }
    );
    this.props.removeCurrentEmployee();
    this.setState({
      newEmployeeForm: false,
      addEmailForm: false,
      sendEmailForm: false,
      employeeId: "",
      showModal: false,
      responseModal: false,
      deleteModal: false
    });
  };

  showDeleteModal = () => {
    this.setState({ deleteModal: true });
  };

  deleteHandler = () => {
    //todo redirect to dashboard
    this.props.deleteJobThunk(this.props.job._id);
    this.closeModal();
    this.props.history.push("/dashboard");
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
        <Email
          closeModal={this.closeModal}
          sendEmailSubmitHandler={this.sendEmailSubmitHandler}
        />
      );
    }
  };

  render() {
    if (
      Object.keys(this.props.job).length === 0 &&
      this.props.employees.length === 0
    ) {
      return <Loading />;
    }

    return (
      <div>
        <HeaderContainer>
          <h1>{this.props.job.company}</h1>
        </HeaderContainer>

        <PageContainer>
          <Job job={this.props.job} />
          <TableDiv>
            <AddFlex>
              <TableButton onClick={this.newEmployeeFormHandler}>
                Add Employee
              </TableButton>
            </AddFlex>

            {this.props.employees.length > 0 && (
              <Table
                employees={this.props.employees}
                jobId={this.props.job._id}
                addEmailButtonClickHandler={this.addEmailButtonClickHandler}
                sendEmailButtonClickHandler={this.sendEmailButtonClickHandler}
                showSmallModal={this.showResponseModal}
              />
            )}

            <AddFlex>
              <DeleteButton onClick={this.showDeleteModal}>
                Delete Job?
              </DeleteButton>
            </AddFlex>
          </TableDiv>
        </PageContainer>
        <Modal
          closeModal={this.closeModal}
          show={this.state.showModal}
          component={this.componentPassToModal()}
        />

        {this.state.responseModal && (
          <SmallModal
            closeModal={this.closeModal}
            show={this.state.responseModal}
            component={
              <UpdateResponse
                _id={this.props.job._id}
                closeModal={this.closeModal}
                submitHandler={this.responseSubmitHandler}
              />
            }
          />
        )}

        {this.state.deleteModal && (
          <SmallModal
            closeModal={this.closeModal}
            show={this.state.deleteModal}
            component={
              <DeleteJob
                _id={this.props.job._id}
                job={this.props.job}
                closeModal={this.closeModal}
                submitHandler={this.deleteHandler}
              />
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    job: state.job.currentJob,
    employees: state.employee.employees,
    currentEmployeeId: state.employee.currentEmployee._id,
    templates: state.template.templates
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
    sendNewGmailThunk: (employeeId, emailObj) =>
      dispatch(sendNewGmailThunk(employeeId, emailObj)),
    removeEmployees: () => dispatch(removeEmployees()),
    removeCurrentJob: () => dispatch(removeCurrentJob()),
    readAllTemplatesThunk: () => dispatch(readAllTemplatesThunk()),
    deleteJobThunk: jobId => dispatch(deleteJobThunk(jobId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobContainer);

const AddFlex = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const DeleteButton = styled(TableButton)`
  background-color: red;
  :hover {
    box-shadow: 0;
    background-color: #edadad;
  }
`;

const TableDiv = styled.div``;

const PageContainer = styled.div`
  height: auto;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
