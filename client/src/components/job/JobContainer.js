import React, { useEffect } from "react";
import { connect } from "react-redux";
import MenuOptions from "./MenuOptions";
import ButtonsAboveTable from "../employees/tables/ButtonsAboveTable";
import Table from "../employees/tables/EmployeeTable";
import ButtonsBelowTable from "../employees/tables/ButtonsBelowTable";
import Modal from "../layout/Modal";
import SmallModal from "../layout/SmallModal";
import Loading from "../layout/Loading";
import { currentJob, removeCurrentJob } from "../../redux/actions/job";
import {
  currentEmployee,
  removeCurrentEmployee,
  removeEmployees
} from "../../redux/actions/employee";
import { getJobByIdThunk } from "../../redux/thunks/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import { readAllTemplatesThunk } from "../../redux/thunks/template";
import styled from "styled-components";
import { HeaderContainer } from "../resusableComponents/styledComponents";

const JobContainer = ({
  job,
  employees,
  match,
  templates,
  getJobByIdThunk,
  getEmployeesThunk,
  removeEmployees,
  removeCurrentJob,
  readAllTemplatesThunk
}) => {
  useEffect(() => {
    if (templates.length === 0) {
      readAllTemplatesThunk();
    }

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

  if (Object.keys(job).length === 0 && employees.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <HeaderContainer>
        <h1>{job.company}</h1>
      </HeaderContainer>

      <PageContainer>
        <MenuOptions />
        <div>
          <ButtonsAboveTable />
          <Table />
          <ButtonsBelowTable />
        </div>
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
    getJobByIdThunk: jobId => dispatch(getJobByIdThunk(jobId)),
    currentJob: jobId => dispatch(currentJob(jobId)),
    removeCurrentJob: () => dispatch(removeCurrentJob()),
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId)),
    removeEmployees: () => dispatch(removeEmployees()),
    currentEmployee: employeeId => dispatch(currentEmployee(employeeId)),
    removeCurrentEmployee: () => dispatch(removeCurrentEmployee()),
    readAllTemplatesThunk: () => dispatch(readAllTemplatesThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobContainer);

const PageContainer = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
`;
