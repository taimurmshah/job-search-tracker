import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateEmployeeThunk,
  deleteEmployeeThunk
} from "../../redux/thunks/employee";
import Employee from "./Employee";
import UpdateEmployee from "./UpdateEmployee";
import Modal from "../layout/Modal";
import SmallModal from "../layout/SmallModal";
import Loading from "../layout/Loading";
import styled from "styled-components";
import DeleteEmployee from "./DeleteEmployee";

class Table extends Component {
  state = {
    currentEmployee: {},
    updateModal: false,
    deleteModal: false
  };

  closeModal = () => {
    this.setState({
      updateModal: false,
      currentEmployee: {},
      deleteModal: false
    });
  };

  openUpdateModal = emp => {
    this.setState({ updateModal: true, currentEmployee: emp });
  };

  openDeleteModal = emp => {
    this.setState({ deleteModal: true, currentEmployee: emp });
  };

  deleteHandler = () => {
    this.props.deleteEmployeeThunk(
      this.props.jobId,
      this.state.currentEmployee._id
    );
    this.closeModal();
  };

  render() {
    if (!this.props.employees) {
      return <Loading />;
    }

    const tableData = this.props.employees.map(e => {
      return (
        <Employee
          key={e._id}
          employee={e}
          addEmailButtonClickHandler={this.props.addEmailButtonClickHandler}
          sendEmailButtonClickHandler={this.props.sendEmailButtonClickHandler}
          showSmallModal={this.props.showSmallModal}
          openUpdateModal={this.openUpdateModal}
          openDeleteModal={this.openDeleteModal}
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

        {this.state.updateModal && (
          <Modal
            show={this.state.updateModal}
            closeModal={this.closeModal}
            component={
              <UpdateEmployee
                employee={this.state.currentEmployee}
                closeModal={this.closeModal}
                openDeleteModal={this.openDeleteModal}
              />
            }
          />
        )}

        {this.state.deleteModal && (
          <SmallModal
            closeModal={this.closeModal}
            show={this.state.deleteModal}
            component={
              <DeleteEmployee
                employee={this.state.currentEmployee}
                deleteHandler={this.deleteHandler}
                closeModal={this.closeModal}
              />
            }
          />
        )}
      </Div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates)),
    deleteEmployeeThunk: (jobId, employeeId) =>
      dispatch(deleteEmployeeThunk(jobId, employeeId))
  };
};

export default connect(
  null,
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
