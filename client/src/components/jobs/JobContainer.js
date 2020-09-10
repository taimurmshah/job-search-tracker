import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "../employees/table/Table";
import AddEmail from "../email/AddEmail";
import EmailContainer from "../email/EmailContainer";
import Modal from "../layout/Modal";
import SmallModal from "../layout/SmallModal";
import UpdateResponse from "../employees/UpdateEmployeeResponse";
import Loading from "../layout/Loading";
import Job from "./JobMenuOptions";
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
import ButtonsAboveTable from "../employees/table/ButtonsAboveTable";
import ButtonsBelowTable from "../employees/table/ButtonsBelowTable";
import EmployeeDataForm from "../employees/EmployeeDataForm";

const JobContainer = ({
  job,
  employees,
  match,
  templates,
  history,
  getJobByIdThunk,
  getEmployeesThunk,
  removeEmployees,
  removeCurrentJob,
  currentEmployeeId,
  currentEmployee,
  removeCurrentEmployee,
  readAllTemplatesThunk,
  newEmployeeThunk,
  updateEmployeeThunk,
  sendNewGmailThunk,
  deleteJobThunk
}) => {
  useEffect(() => {
    if (templates.length === 0) readAllTemplatesThunk();

    if (employees.length === 0 && Object.keys(job).length === 0) {
      const jobId = match.params.id;
      getJobByIdThunk(jobId);
      getEmployeesThunk(jobId);
    }

    return () => {
      removeEmployees();
      removeCurrentJob();
    };
  }, []);

  const [newEmployeeForm, setNewEmployeeForm] = useState(false);
  const [addEmailForm, setAddEmailForm] = useState(false);
  const [sendEmailForm, setSendEmailForm] = useState(false);
  const [stateEmployeeId, setEmployeeId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const addEmailButtonClickHandler = employeeId => {
    currentEmployee(employeeId);
    setAddEmailForm(true);
    setEmployeeId(employeeId);
    setShowModal(true);
  };

  const sendEmailButtonClickHandler = employeeId => {
    currentEmployee(employeeId);
    if (templates.length === 0) {
      readAllTemplatesThunk();
    }
    setSendEmailForm(true);
    setEmployeeId(employeeId);
    setShowModal(true);
  };

  const newEmployeeSubmitHandler = employee => {
    setNewEmployeeForm(false);
    setShowModal(false);
    newEmployeeThunk(employee, job._id);
  };

  const updateEmployeeSubmitHandler = updates => {
    removeCurrentEmployee();
    updateEmployeeThunk(job._id, stateEmployeeId, updates);

    setNewEmployeeForm(false);
    setAddEmailForm(false);
    setSendEmailForm(false);
    setEmployeeId("");
    setShowModal(false);
  };

  const sendEmailSubmitHandler = emailObj => {
    removeCurrentEmployee();
    sendNewGmailThunk(stateEmployeeId, emailObj);
    setNewEmployeeForm(false);
    setAddEmailForm(false);
    setSendEmailForm(false);
    setEmployeeId("");
    setShowModal(false);
  };

  const closeModal = () => {
    removeCurrentEmployee();
    setShowModal(false);
    setAddEmailForm(false);
    setSendEmailForm(false);
    setNewEmployeeForm(false);
    setEmployeeId("");
    setResponseModal(false);
    setDeleteModal(false);
  };

  const showResponseModal = employeeId => {
    currentEmployee(employeeId);
    setResponseModal(true);
  };

  const responseSubmitHandler = () => {
    updateEmployeeThunk(job._id, currentEmployeeId, { response: true });
    closeModal();
  };

  const deleteHandler = () => {
    deleteJobThunk(job._id);
    closeModal();
    history.push("/dashboard");
  };

  const componentPassToModal = () => {
    if (
      newEmployeeForm === true &&
      addEmailForm === false &&
      sendEmailForm === false
    ) {
      return (
        <EmployeeDataForm
          submitEmployeeData={newEmployeeSubmitHandler}
          closeModal={closeModal}
        />
      );
    } else if (
      newEmployeeForm === false &&
      addEmailForm === true &&
      sendEmailForm === false
    ) {
      return (
        <AddEmail
          closeModal={closeModal}
          updateEmployeeSubmitHandler={updateEmployeeSubmitHandler}
        />
      );
    } else if (
      newEmployeeForm === false &&
      addEmailForm === false &&
      sendEmailForm === true
    ) {
      return (
        <EmailContainer
          closeModal={closeModal}
          sendEmailSubmitHandler={sendEmailSubmitHandler}
        />
      );
    }
  };

  // debugger;

  if (Object.keys(job).length === 0 && employees.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <HeaderContainer>
        <h1>{job.company}</h1>
      </HeaderContainer>

      <PageContainer>
        <Job />
        <TableDiv>
          <ButtonsAboveTable />
          <Table />
          <ButtonsBelowTable />
        </TableDiv>
      </PageContainer>
      <Modal />
      <SmallModal />
    </div>
  );
};

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
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
`;
