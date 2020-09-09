import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteEmployeeThunk } from "../../../redux/thunks/employee";
import Employee from "../Employee";
import UpdateEmployee from "../UpdateEmployee";
import Modal from "../../layout/Modal";
import SmallModal from "../../layout/SmallModal";
import Loading from "../../layout/Loading";
import styled from "styled-components";
import DeleteEmployee from "../DeleteEmployee";

const Table = ({
  employees,
  jobId,
  deleteEmployeeThunk,
  addEmailButtonClickHandler,
  sendEmailButtonClickHandler,
  showSmallModal
}) => {
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const closeModal = () => {
    setCurrentEmployee({});
    setUpdateModal(false);
    setDeleteModal(false);
  };

  const openUpdateModal = employee => {
    setUpdateModal(true);
    setCurrentEmployee(employee);
  };

  const openDeleteModal = employee => {
    setDeleteModal(true);
    setCurrentEmployee(employee);
  };

  const deleteHandler = () => {
    deleteEmployeeThunk(jobId, currentEmployee._id);
    closeModal();
  };

  if (!employees) return <Loading />;

  const tableData = employees.map(e => {
    return (
      <Employee
        key={e._id}
        employee={e}
        addEmailButtonClickHandler={addEmailButtonClickHandler}
        sendEmailButtonClickHandler={sendEmailButtonClickHandler}
        showSmallModal={showSmallModal}
        openUpdateModal={openUpdateModal}
        openDeleteModal={openDeleteModal}
      />
    );
  });

  return (
    <Div>
      <StyledTable>
        <THead>
          <tr>
            <TH>Name</TH>
            <TH>Position</TH>
            <TH>LinkedIn</TH>
            <TH>Response</TH>
            <TH>Email</TH>
            <TH>Emails Sent</TH>
            <TH>Action</TH>
          </tr>
        </THead>
        <tbody>{tableData}</tbody>
      </StyledTable>

      {updateModal && (
        <Modal
          show={updateModal}
          closeModal={closeModal}
          component={
            <UpdateEmployee
              employee={currentEmployee}
              closeModal={closeModal}
              openDeleteModal={openDeleteModal}
            />
          }
        />
      )}

      {deleteModal && (
        <SmallModal
          closeModal={closeModal}
          show={deleteModal}
          component={
            <DeleteEmployee
              employee={currentEmployee}
              deleteHandler={deleteHandler}
              closeModal={closeModal}
            />
          }
        />
      )}
    </Div>
  );
};

const mapStateToProps = state => {
  return {
    employees: state.employee.employees,
    jobId: state.job.currentJob._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEmployeeThunk: (jobId, employeeId) =>
      dispatch(deleteEmployeeThunk(jobId, employeeId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);

const Div = styled.div`
  display: flex;
  width: 100%
  flex-direction: row;
  justify-content: center;
`;

const StyledTable = styled.table`
  font-size: 16px;
  border: none;
  padding: 3px;
  border-collapse: collapse;
  font-family: "Bitter", serif;
  background-color: rgb(15, 174, 241);
  border-radius: 5px;
  margin-bottom: 40px;
`;

const TH = styled.th`
  border: none;
  font-size: 18px;
`;

const THead = styled.thead`
  height: 100px;
`;
